const db = require("../config/db");

// 일간 기록 추출
const getDailyScores = async (role, userId, date) => {
    if(role === "worker"){
        return await db.query( // time_slot: 발생 시간, deduction_reason: 감점 사유, detection_count: 감지된 객체 수, violation_count: 감지된 미착용자 수
            `SELECT time_slot, deduction_reason, detection_count, violation_count, score
            FROM score
            WHERE user_id = ? AND score_date = ?
            ORDER BY time_slot
            `, [userId, date]);
    } else if(role === "admin"){
        return await db.query( // 관리자인 경우 관리하는 모든 현장의 내용 호출
            `SELECT time_slot, deduction_reason, detection_count, violation_count, score
            FROM score
            WHERE score_date = ? AND user_id IN (SELECT user_id
                                                   FROM users
                                                  WHERE superior_id = ?)
            ORDER BY time_slot
            `, [date, userId]
        );
    }
    throw new Error("Unknown role");
};

// 주간 점수 추출
const getWeeklyScores = async(role, userId, scoreYear, weekNumber) => {
    if(role === "worker"){
        return await db.query(
            `SELECT average_score, grade
            FROM weekly_score
            WHERE user_id = ? AND score_year = ? AND week_number = ?
            `, [userId, scoreYear, weekNumber]);
    } else if (role === "admin"){
        return await db.query(
            `SELECT average_score, grade
            FROM weekly_score
            WHERE score_year = ? AND week_number = ? AND user_id IN (SELECT user_id
                                                                       FROM users
                                                                      WHERE superior_id = ?)
            `, [scoreYear, weekNumber, userId]
        );
    }

    throw new Error("Unknown role");
};

module.exports = {getDailyScores, getWeeklyScores};