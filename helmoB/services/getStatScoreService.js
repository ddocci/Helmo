// 주간, 월간 통계를 score테이블을 통해 계산하는 모듈(저장 하지 않고, 읽기만 하는 기능)
const db = require("../config/db");
const { getIsoWeekRange, getMonthRange } = require("../utils/dateUtils");
const { calComplianceRate, gradeByCompliance } = require("../utils/calRateGrade");

// 주간 통계 계산
const computeWeeklyScore = async (userId, anyDateInWeek) => {
    const { start, end } = getIsoWeekRange(anyDateInWeek);
    const [rows] = await db.query(
        `
        SELECT COALESCE(SUM(detection_count),0) AS td,
               COALESCE(SUM(violation_count),0) AS tv
        FROM score
        WHERE user_id=? AND score_date BETWEEN ? AND ?
        `, [userId, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
    );

    const td = Number(rows[0]?.td || 0);
    const tv = Number(rows[0]?.tv || 0);
    const compliance_rate = calComplianceRate(td, tv);
    const grade = gradeByCompliance(complianceRate);

    return { total_detection: td, total_violation: tv, compliance_rate, grade, week_start_date: start.format("YYYY-MM-DD"), week_end_date: end.format("YYYY-MM-DD") };
};

// 월간 통계 계산
const computeMonthlyScore = async (userId, anyDateInMonth) => {
    const { start, end } = getMonthRange(anyDateInMonth);
    const [rows] = await db.query(
        `
        SELECT COALESCE(SUM(detection_count),0) td,
               COALESCE(SUM(violation_count),0) tv,
               COUNT(DISTINCT score_date) wd
        FROM score
        WHERE user_id = ? AND score_date BETWEEN ? AND ?
        `, [userId, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
    );

    const td = Number(rows[0]?.td || 0);
    const tv = Number(rows[0]?.tv || 0);
    const wd = Number(rows[0]?.wd || 0);
    const compliance_rate = calComplianceRate(td, tv);
    const grade = gradeByCompliance(compliance_rate);
    return { total_detection: td, total_violation: tv, working_days: wd, compliance_rate, grade, month_start_date: start.format("YYYY-MM-DD"), month_end_date: end.format("YYYY-MM-DD") };
}

module.exports = { computeMonthlyScore, computeWeeklyScore };