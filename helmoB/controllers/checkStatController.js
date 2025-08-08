// 통계 조회 컨트롤러
// db의 weekly_score, month_grade 테이블로부터 주간, 월간 통계를 조회
const db = require("../config/db");

// GET: /api/admin/weekly-stat?year=0000&week=00
const getWeeklyStatistics = async (req, res) => {
    const adminId = req.user.userId;
    const {year, week} = req.query;

    try {
        // 관리자가 관할하는 작업자(현장)들의 주간 기록 조회
        const [rows] = await db.query(
            `
            SELECT ws.*
            FROM weekly_score ws JOIN users u
              ON ws.user_id = u.user_id
            WHERE ws.score_year = ? AND ws.week_number = ? AND u.superior_id = ?
            `, [Number(year), Number(week), adminId]
        );

        
    }
}
