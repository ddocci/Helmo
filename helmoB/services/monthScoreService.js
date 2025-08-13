const db = require("../config/db");
const {getYearAndMonth, getMonthRange} = require("../utils/dateUtils");
const {calComplianceRate, gradeByCompliance} = require("../utils/calRateGrade");

const upsertMonthlyRecord = async (userId, anyDateInMonth) => {
    const {year, month} = getYearAndMonth(anyDateInMonth);
    const {start, end} = getMonthRange(anyDateInMonth);

    const [sumRows] = await db.query(
        `
        SELECT
          COALESCE(SUM(detection_count),0) AS total_detection,
          COALESCE(SUM(violation_count),0) AS total_violation,
          COUNT(DISTINCT score_date) AS working_days
        FROM score
        WHERE user_id = ?
          AND score_date BETWEEN ? AND ?
        `, [userId, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
    );
    const totalDetection = Number(sumRows[0].total_detection || 0);
    const totalViolation = Number(sumRows[0].total_violation || 0);
    const workingDays = Number(sumRows[0].working_days || 0);

    // 안전모 착용 준수율, 등급
    const complianceRate = calComplianceRate(totalDetection, totalViolation);
    const grade = gradeByCompliance(complianceRate);

    const [existRows] = await db.query(
        `
        SELECT month_id
        FROM month_grade
        WHERE user_id = ? AND score_year = ? AND score_month = ?
        ORDER BY month_id DESC
        LIMIT 1
        `, [userId, year, month]
    );

    // 해당 월의 해당 현장 데이터가 테이블에 존재하는 경우 업데이트
    if (existRows.length > 0) {
        const monthId = existRows[0].month_id;
        await db.query(
            `
            UPDATE month_grade
            SET total_score = ?,
                average_score = ?,
                grade =?,
                working_days = ?,
                updated_at = NOW()
            WHERE month_id = ?            
            `, [totalViolation, complianceRate, grade, workingDays, monthId]
        );
    } else { // 해당 월의 해당 현장 데이터가 테이블에 존재하지 않는 경우 삽입
        await db.query(
            `
            INSERT INTO month_grade
            (user_id, score_year, score_month, total_score, average_score, grade, working_days, created_at, updated_at)
            VALUES(?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `, [userId, year, month, totalViolation, complianceRate, grade, workingDays]
        );
    }

    return {
        user_id: userId,
        score_year: year,
        score_month: month,
        total_score: totalViolation,
        average_score: complianceRate,
        grade,
        working_days: workingDays,
    };
};

// 월간 통계 조회
const getMonthlyRecord = async (userId, year, month) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM month_grade
        WHERE user_id = ? AND score_year = ? AND score_month = ?
        ORDER BY month_id DESC
        LIMIT 1
        `, [userId, year, month]
    );

    if(rows.length > 0) return rows[0];

    return null; // 해당 월의 통계가 없는 경우 null 리턴
};

module.exports = {upsertMonthlyRecord, getMonthlyRecord};