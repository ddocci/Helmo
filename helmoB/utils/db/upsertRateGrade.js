const db = require("../config/db");
const {getYearAndWeek, getIsoWeekRange, getYearAndMonth, getMonthRange} = require("../dateUtils");
const {calComplianceRate, gradeByCompliance} = require("../calRateGrade");

// 주간, 월간 별 설정 화이트리스트
const PERIODS = {
    week: {
        table: "weekly_score", // 수정할 대상 테이블
        yearField: "score_year", // 연도 컬럼
        numberField: "week_number", // 몇 번째 주 컬럼
        getScope: getYearAndWeek,
        getRange: getIsoWeekRange, // 그 주의 시작과 끝을 반환
        scopeToParams: (s) => [s.year, s.week],
    },
    month: {
        table: "month_grade",
        yearField: "score_yaer",
        numberField: "score_month",
        getScope: getYearAndMonth,
        getRange: getMonthRange,
        scopeToParams: (s) => [s.year, s.month],
    }
};

/**
 * 점수 수치(총합, 근무 일수 등)은 조회 시 계산, grade만 여기서 계산
 * @param {string|number} user_id
 * @param {string|Date|dayjs} dateInput
 * @param {{period: "week" | "month"}} options
 * @returns {Promise<{scope:{userId, year, week?, month?}, total_detection:number, total_violation:number, compliance_rate:number, grade:string}>}
 */
const upsertPeriodGrade = async (userId, dateInput, {period = "week"} = {}) => {
    const cfg = PERIODS[period];
    if (!cfg) throw new error(`Unsupported period: ${period}`);

    const scope = cfg.getScope(dateInput);
    const { start, end } = cfg.getRange(dateInput);

    const [rows] = await db.query(
        `SELECT
            COALESCE(SUM(detection_count), 0) AS total_detection,
            COALESCE(SUM(violation_count), 0) AS total_violation
        FROM score
        WHERE user_id = ?
          AND score_date BETWEEN ? AND ?
        `, [userId, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
    );

    const { td, tv, rate } = calComplianceRate(rows[0].total_detection, rows[0].total_violation); // 안전모 착용 준수율 계산
    const grade = gradeByCompliance(rate); // 준수율을 기반으로 등급 계산

    // db 수정(upsert)
    const insertSql = 
    `INSERT INTO ${cfg.table} (user_id, ${cfg.yearField}, ${cfg.numberField}, grade, total_score, average_score)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE grade = VALUES(grade), total_score = VALUES(total_score), average_score = VALUES(average_score)
    `;// ON DUPLICATE KEY를 이용하여 KEY(UNIQUE 제약조건이 적용된 컬럼들)값이 동일한 값이 존재하는 ROW의 경우 INSERT 대신 UPDATE가 진행 됨, 여기서는 grade 앞의 세 컬럼이 KEY 
    await db.query(
        insertSql,
        [userId, ...cfg.scopeToParams(scope), grade, tv, rate]
    );

    return {
        scope: {userId, ...scope},
        total_detection: td,
        total_violation: tv,
        compliance_rate: rate,
        grade,
    };
}

module.exports = { upsertPeriodGrade };