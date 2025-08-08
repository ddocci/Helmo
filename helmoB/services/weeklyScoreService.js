// score 테이블에 데이터가 추가되면 이를 반영하여 weekly_score 테이블에 새로운 데이터를 추가하거나(그 주의 데이터가 없는 경우), 업데이트(그 주의 데이터가 있는 경우)
const db = require("../config/db");
const { getYearAndWeek, getIsoWeekRange } = require("../utils/dateUtils");
const { calComplianceRate, gradeByCompliance } = require("../utils/calRateGrade");

// 주간 점수 테이블 추가 / 수정
const upsertWeeklyRecord = async (userId, anyDAteInWeek) => {
    const {year, week} = getYearAndWeek(anyDateInWeek);
    const {start, end} = getIsoWeekRange(anyDateInWeek);

    const [sumRows] = await db.query(
        `
        SELECT
          COALESCE(SUM(detection_count),0) AS total_detection,
          COALESCE(SUM(violation_count),0) AS total_violation
        FROM score
        WHERE user_id = ?
          AND score_date BETWEEN ? AND ?
        `, [userId, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")]
    );

    const totalDetection = Number(sumRows[0].total_detection || 0);
    const totalViolation = Number(sumRows[0].total_violation || 0);

    // 그 주의 안전모 착용율과 등급
    const complianceRate = calComplianceRate(totalDetection, totalViolation);
    const grade = gradeByCompliance(complianceRate);

    // 그 주의 주간 기록이 존재하는 지 확인
    const [existRows] = await db.query(
        `
        SELECT weekly_id
        FROM weekly_score
        WHERE user_id = ? AND score_yaer = ? AND week_number = ?
        ORDER BY weekly_id DESC
        LIMIT 1
        `, [userId, year, week]
    );

    // 그 주의 주간 기록이 존재하는 경우
    if (existRows.length > 0){
        const weeklyId = existRows[0].weekly_id;
        await db.query(
            `
            UPDATE weekly_score
            SET week_start_date = ?,
                week_end_date = ?,
                total_score = ?,
                average_score = ?,
                grade = ?,
                score_year = ?,
                week_number = ?,
                updated_at = NOW()
            WHERE weekly_id = ?
            `, [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), totalViolation, complianceRate, grade, year, week, weeklyId]
        );
    } else { // 그 주의 기록이 존재하지 않는 경우(그 주의 첫 기록인 경우)
        await db.query(
            `
            INSERT INTO weekly_score
            (user_id, score_year, week_number, week_start_date, week_end_date, total_score, average_score, grade, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `, [userId, year, week, start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), totalViolation, complianceRate, grade]
        );
    }

    return {
        user_id: userId,
        score_year: year,
        week_number: week,
        week_start_date: start.format("YYYY-MM-DD"),
        week_end_date: end.format("YYYY-MM-DD"),
        total_score: totalViolation,
        average_score: complianceRate,
        grade
    };
};

const getWeeklyRecord = async(userId, year, week) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM weekly_score
        WHERE user_id = ? AND score_year = ? AND week_number = ?
        ORDER BY weekly_id DESC
        LIMIT 1
        `, [userId, year, week]
    );

    if(rows.length > 0) return rows[0];

    // 해당 데이터가 존재하지 않는 경우 null 리턴
    return null;
};

module.exports = {upsertWeeklyRecord, getWeeklyRecord};