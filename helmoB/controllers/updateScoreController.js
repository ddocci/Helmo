const db = require("../config/db");
const {upsertWeeklyRecord} = require("../services/weeklyScoreService");
const {upsertMonthlyRecord} = require("../services/monthScoreService");
const sendResponse = require("../utils/response"); 
// 이미지 업로드 -> backend -> python server -> 모델 예측 -> 예측 결과
// POST : /api/admin/add-score : 일간 기록 추가
const addScore = async (req, res) => {
    const {user_id, score_date, detection_count, violation_count, time_slot, deduction_reason} = req.body; // 추가할 score 데이터
    const conn = await db.getConnection();

    try{
        await conn.beginTransaction();

        await conn.query(
            `
            INSERT INTO score
                (user_id, score_date, detection_count, violation_count, time_slot, deduction_reason)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [user_id, score_date, detection_count, violation_count, time_slot || null, deduction_reason || null]
        );

        // 주간, 월간 통계 데이터 업데이트
        const weekly = await upsertWeeklyRecord(user_id, score_date);
        const monthly = await upsertMonthlyRecord(user_id, score_date);

        await conn.commit(); // db 커밋
        return sendResponse(res, {message: "score insert successed", data:{weekly, monthly}});
    } catch(err) {
        await conn.rollback(); // 에러 발생 시 db 롤백
        console.error("score 테이블에 데이터 삽입 중 에러 발생", err);
        return sendResponse(res, {status:500, success: false, message: "Add Score Failed"})
    } finally {
        conn.release();
    }
};

/** [PUT] /adp/admin/update-score/:id : 일간 기록 수정 (score_date가 바뀔 수 있음) */
const updateScore = async (req, res) => {
  const { id } = req.params;
  const { user_id, score_date, detection_count, violation_count, time_slot, deduction_reason } = req.body;
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 기존 날짜 조회(주/월 재계산을 위해)
    const [[oldRow]] = await conn.query(`SELECT user_id, score_date FROM score WHERE id = ?`, [id]);

    if (!oldRow){
        await conn.rollback();
        return sendResponse(res, {status: 404, success: false, message: "존재하지 않는 score 데이터"});
    }
    
    // score 업데이트
    await conn.query(
      `UPDATE score
       SET user_id=?, score_date=?, detection_count=?, violation_count=?, time_slot=?, deduction_reason=?, updated_at=NOW()
       WHERE id = ?`,
      [user_id, score_date, detection_count, violation_count, time_slot || null, deduction_reason || null, id]
    );

    // 과거 주/월 갱신(날짜 이동 케이스)
    if (oldRow.score_date !== score_date) {
      await upsertWeeklyRecord(oldRow.user_id, oldRow.score_date);
      await upsertMonthlyRecord(oldRow.user_id, oldRow.score_date);
    }
    // 입력된 score_date의 주/월 갱신
    const weekly = await upsertWeeklyRecord(user_id, score_date);
    const monthly = await upsertMonthlyRecord(user_id, score_date);

    await conn.commit();
    return sendResponse(res, {message: "Score update successfully", data: {weekly, monthly}});
  } catch (err) {
    await conn.rollback();
    console.error("score를 수정하고 month_grade와 weekly_score에 반영하는 중 에러 발생", err);
    return sendResponse(res, {status: 500, success: false, message: "UpdateScores Failed"});
  } finally {
    conn.release();
  }
};

module.exports = {addScore, updateScore};