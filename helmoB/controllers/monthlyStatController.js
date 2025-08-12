// 월간 통계 컨트롤러
// GET: /api/admin/monthly-stat?date=yyyy-mm-dd&view=___&include_missing=false&sort_by=____&order=desc

const db = require("../config/db");
const sendResponse = require("../utils/response");
const { computeMonthlyScore } = require("../services/getStatScoreService");
const { dayjs, getMonthRange } = require("../utils/dateUtils");
const { calComplianceRate } = require("../utils/calRateGrade");

const getMonthlyStatistics = async (req, res) => {
    const adminId = req.user.userId;

    // 우선순위: year/month > date
    let year = Number(req.query.year);
    let month = Number(req.query.month);
    const dateStr = req.query.date; // YYYY-MM-DD

    // year/month가 없고 date가 있으면 변환
    if ((!Number.isFinite(year) || !Number.isFinite(month)) && dateStr) {
      const d = dayjs(dateStr);
      if (!d.isValid()) {
        return sendResponse(res, { status: 400, success: false, message: "date 파라미터가 유효하지 않습니다." });
      }
      year = d.isoWeekYear();
      month = d.month() + 1;
    }

    if (!Number.isFinite(year) || !Number.isFinite(month)) {
      return sendResponse(res, { status: 400, success: false, message: "year/month 파라미터가 유효하지 않습니다." });
    }
    // options
    const view = (req.query.view || "both").toLowerCase(); // summary | detail | both
    const includeMissing = String(req.query.include_missing || "false") === "true";
    const sortBy = (req.query.sort_by || "average_score").toLowerCase();
    const order = (req.query.order || "desc").toUpperCase() === "ASC" ? "ASC" : "DESC";

    try {
        // 파라미터 검증
        if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
            return sendResponse(res, { status: 400, success: false, message: "year/month 파라미터가 유효하지 않습니다. " });
        }

        // 관리자 관할 작업자 추출
        const [workers] = await db.query(
            `
            SELECT user_id, name FROM users WHERE superior_id = ?
            `, [adminId]
        );
        const workerIds = workers.map(w => w.user_id);

        if (workerIds.length === 0) { // 해당 관리자가 관리하는 작업자가 없는 경우
            return sendResponse(res, {
                data: {
                    scope: {year, month},
                    summary: view !== "detail" ? {sites: 0, total_violation: 0, total_working_days: 0, avg_compliance: 100} : undefined,
                    detail: view !== "summary" ? [] : undefined
                }
            });
        }   
        // 관할 작업자(현장) 별 detail 데이터: month_grade 테이블과 users 테이블에서 조회
        const [rows] = await db.query(
            `
            SELECT *
            FROM month_grade mg JOIN users u
                ON mg.user_id = u.user_id
            WHERE mg.score_year = ? AND mg.score_month = ? AND u.superior_id = ?
            `, [year, month, adminId]
        );

        // 기준일을 잡기 위해 해당 월의 중간 날짜를 찾음
        const anyDate = dayjs(`${year}-${String(month).padStart(2, "0")}-15`);

        // 관할 작업자 별 데이터 객체를 배열에 저장
        const perSite = rows.map(r => ({
            user_id: r.user_id,
            worker_name: r.name || null,
            total_score: Number(r.total_score || 0),
            average_score: Number(r.average_score || 0),
            working_days: Number(r.working_days || 0),
            grade: r.grade || null,
            from_cache: true // 집계 테이블(month_grade 데이터에서 수집)
        }));

        // including_missing : month_grade에 없는 작업자(현장)은 score 테이블에서 계산
        if (includeMissing) {
            const present = new Set(perSite.map(p => p.user_id));
            const missing = workers.filter(w => !present.has(w.user_id)); // 집계 테이블에서 조회되지 않은 관할 작업자
            if (missing.length > 0) {
                for (const m of missing){
                    const stat = await computeMonthlyScore(m.user_id, anyDate); // score 테이블을 이용하여 통계 계산
                    perSite.push({
                        user_id: m.user_id,
                        worker_name: m.name || null,
                        total_score: Number(stat.total_violation || 0),
                        average_score: Number(stat.compliance_rate || 0),
                        working_days: Number(stat.working_days || 0),
                        grade: stat.grade || null,
                        from_cache: false // 테이블에 저장되지 않는 데이터
                    });
                }
            }
        }

        // 요약(summary) 계산
        const { start, end } = getMonthRange(anyDate);// 해당 월의 시작 날짜, 마지막 날짜

        const inClause = workerIds.map(() => "?").join(","); //SELECT문의 WHERE 절에 user_id IN (?, ?, ? ...)의 ?, ?, ?로 넣기 위해 문자열 작성
        const [sumRows] = await db.query(
            `
            SELECT COALESCE(SUM(detection_count), 0) AS total_detection,
                   COALESCE(SUM(violation_count), 0) AS total_violation
            FROM score
            WHERE score_date BETWEEN ? AND ?
              AND user_id IN (${inClause})
            `,  // 바인딩 순서: 날짜 2개 + user_ids + user_ids (위 쿼리에서 IN 절을 2번 쓰지 않는다면 한 번만 넘겨도 됨)
            [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), ...workerIds]
        );

    const totalDetection = Number(sumRows[0]?.total_detection || 0);
    const totalViolation = Number(sumRows[0]?.total_violation || 0);
    const avgCompliance = calComplianceRate(totalDetection, totalViolation); // 가중 평균 방식

    // 4) 정렬(문자열/등급/숫자 구분)
    const allowed = ["average_score", "total_score", "working_days", "grade", "worker_name"];
    const sortKey = allowed.includes(sortBy) ? sortBy : "average_score";
    const gradeOrder = { "A+": 6, "A": 5, "B+": 4, "B": 3, "C+": 2, "C": 1 };

    perSite.sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];

      if (sortKey === "worker_name") {
        const cmp = String(va || "").localeCompare(String(vb || ""), "ko", { sensitivity: "base" });
        return order === "ASC" ? cmp : -cmp;
      }
      if (sortKey === "grade") {
        const ga = gradeOrder[String(va)] ?? 0;
        const gb = gradeOrder[String(vb)] ?? 0;
        return order === "ASC" ? ga - gb : gb - ga;
      }
      const na = Number(va) || 0;
      const nb = Number(vb) || 0;
      return order === "ASC" ? na - nb : nb - na;
    });

    // 5) 응답
    const payload = {
      scope: {
        year, month,
        month_start_date: start.format("YYYY-MM-DD"),
        month_end_date: end.format("YYYY-MM-DD"),
      },
      summary: view !== "detail" ? {
        sites: perSite.length,
        total_violation: totalViolation,
        total_working_days: perSite.reduce((acc, r) => acc + (r.working_days || 0), 0),
        avg_compliance: avgCompliance,
      } : undefined,
      detail: view !== "summary" ? perSite : undefined,
    };

    return sendResponse(res, { data: payload });

  } catch (err) {
    console.error("getMonthlyStatistics error:", err);
    return sendResponse(res, { status: 500, success: false, message: "monthly statistics fetch failed" });
  }
};

module.exports = { getMonthlyStatistics };