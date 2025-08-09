// 주간 통계 조회 컨트롤러
// db의 weekly_score 테이블로부터 주간 통계를 조회(테이블에 없는 데이터(ex: 총 탐지된 객체 수)가 필요한 경우 score 테이블에서 계산하여 사용)
const db = require("../config/db");
const sendResponse = require("../utils/response");
const { computeWeeklyScore } = require("../services/getStatScoreService");
const { dayjs, getIsoWeekRange } = require("../utils/dateUtils");
const {calComplianceRate} = require("../utils/calRateGrade");

// GET: /api/admin/weekly-stat?year=0000&week=00&view=aaa&include_missing=false&sort_by=average_score&order=desc&limit=50&offset=0
const getWeeklyStatistics = async (req, res) => {
    const adminId = req.user.userId;
    const year = Number(req.query.year);
    const week = Number(req.query.week);

    // options
    const view = (req.query.view || "both").toLowerCase(); // summary | detail | both
    const includeMissing = String(req.query.include_missing || "false") === "true";
    const sortBy = (req.query.sort_by || "average_score"); // "average_score | total_violation | grade"
    const order = (req.query.order || "desc").toUpperCase() === "ASC" ? "ASC" : "DESC";


    try {
        // 파라미터 검증
        if(!Number.isFinite(year) || Number.isFinite(week)){
            return sendResponse(res, {status:400, success:false, message:"year/week 파라미터가 유효하지 않습니다."});
        }

        // 관리자 관할 작업자 목록
        const [workers] = await db.query(`SELECT user_id, name FROM users WHERE superior_id = ?`, [adminId]);
        const workerIds = workers.map(w => w.user_id);
        if (workerIds.length === 0) {//해당 관리자가 관할하는 작업자가 없는 경우
            return sendResponse(res, {
                data: {
                    scope: {year, week},
                    summary: view !== "detail" ? { sites: 0, total_violation: 0, avg_compliance: 100 } : undefined,
                    detail: view !== "summary" ? [] : undefined,
                }
            });
        }

        // workly_score 테이블에서 관할 현장 주간 레코드 추출
        const [rows] = await db.query(
            `
            SELECT ws.*, u.name AS worker_name
            FROM weekly_score ws JOIN users u
              ON ws.user_id = u.user_id
            WHERE ws.score_year = ? AND ws.week_number = ? AND u.superior_id = ?
            `, [year, week, adminId]
        );

        // 현장 별 상세(detail)
        const perSite = rows.map(r => ({
            user_id: r.user_id,
            worker_name: r.worker_name || null,
            week_start_date: r.week_start_date,
            week_end_date: r.week_end_date,
            total_score: Number(r.total_score || 0),
            average_score: Number(r.average_score || 0),
            grade: r.grade || null,
            from_cache: true // 집계 테이블(weekly_score)에서 온 데이터임을 명시
        }))

        // 집계 테이블(weekly_score)에 없는 현장 데이터 보강 -> score 테이블에서 계산하여 사용
        // 만약 그 주에 해당 현장의 탐지된 객체가 0인 경우 필요
        // 확인하고 있는 주의 수요일 날짜
        const anyDate = dayjs().isoWeekYear(year).isoWeek(week).isoWeekday(3);

        if(includeMissing) {
            const present = new Set(perSite.map(p => p.user_id));
            const missing = workers.filter(w => !present.has(w.user_id)); //관리자 관할 작업자 중 weekly_score 테이블에 없는 작업자 목록 추출
            if (missing.length > 0) {
                for (const m of missing){
                    // score 테이블을 통해 통계 계산
                    const stat = await computeWeeklyScore(m.user_id, anyDate);
                    // 데이터가 없는 경우 점수/착용율이 0/100이 될 것임
                    // 현장 별 상세 데이터에 추가
                    perSite.push({
                        user_id: m.user_id,
                        worker_name: m.name || null,
                        week_start_date: anyDate.isoWeekday(1).format("YYYY-MM-DD"),
                        week_end_date: anyDate.isoWeekday(7).format("YYYY-MM-DD"),
                        total_score: Number(stat.total_violation || 0),
                        average_score: Number(stat.compliance_rate || 0),
                        grade: stat.grade || null,
                        from_cache: false, // 집계 테이블에 저장하지 않음
                    });
                }
            }

        }

        // 요약: score 테이블에서 기간을 합산하여 가중 평균을 계산
        const { start, end } = getIsoWeekRange(anyDate);

        const inClause = workerIds.map(() => "?").join(","); // SELECT문의 WHERE절에 user_id IN (?, ?, ?...)의 ?, ?, ?... 부분
        const [sumRows] = await db.query(
            `
            SELECT COALESCE(SUM(detection_count),0) AS total_detection,
                   COALESCE(SUM(violation_count),0) AS total_violation
            FROM score
            WHERE score_date BETWEEN ? AND ?
              AND user_id IN (${inClause})
            `, [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), ...workerIds] // workerIds 배열의 값들이 위의 inClause의 ?에 하나씩 대입
        );

        const totalDetection = Number(sumRows[0]?.total_detection || 0);
        const totalViolation = Number(sumRows[0]?.total_violation || 0);
        const avgCompliance = calComplianceRate(totalDetection, totalViolation); // 전체 관할 작업장의 안전모 착용 준수율

        // 관리자 관할 현장 데이터 정렬 (detail 모드일 때 제공)
        const sortKey = ["average_score", "total_score", "grade", "worker_name"].includes(sortBy) ? sortBy : "average_score"; // 정렬할 기준 컬럼
        const gradeOrder = {"A+": 6, "A": 5, "B+": 4, "B": 3, "C+": 2, "C": 1, "-": 0}; // grade가 기준일 때 정렬할 순서

        perSite.sort((a, b) => {
            const va = a[sortKey] ?? 0; // 정렬 기준값 a
            const vb = b[sortKey] ?? 0; // 정렬 기준값 b

            if (sortKey === "worker_name"){ // 문자열(작업자 이름) 기준 정렬
                const cmp = String(va || "").localeCompare(String(vb || ""), "ko", {sensitivity: "base"});
                return order === "ASC" ? cmp : -cmp;
            }

            if (sortKey === "grade"){ // 등급(grade) 기준 정렬
                const ga = gradeOrder[String(va)] ?? 0;
                const gb = gradeOrder[String(vb)] ?? 0;
                return order === "ASC" ? ga - gb : gb - ga;
            }

            // 숫자: total_score(총 안전모 미착용 횟수) 기준 정렬
            const na = Number(va) || 0;
            const nb = Number(vb) || 0;
            return order === "ASC" ? na - nb : nb - na;
        });

        // 응답
        const payload = {
            scope: { // 통계가 작성 된 연도, 주, 시작 날짜, 끝 날짜
                year,
                week,
                week_start_date: start.format("YYYY-MM-DD"),
                week_end_date: end.format("YYYY-MM-DD")
            },
            // !==을 사용하여 view === "both"일 때 detail과 summary 모두에 대한 정보 전송 가능
            summary: view !== "detail" ? { // 전체 요약을 요청했을 때
                sites: perSite.length,
                total_violation: totalViolation,
                avg_compliance: avgCompliance
            } : undefined,
            detail: view !== "summary" ? perSite : undefined // 각 현장 별 디테일한 통계를 요청했을 때
        };

        return sendResponse(res, {data: payload});
    } catch (err) {
        console.error("getWeeklyStatistics error", err);
        return sendResponse(res, {status: 500, success: false, message: "weekly statistics fetch failed"});
    }
};

module.exports = { getWeeklyStatistics };
