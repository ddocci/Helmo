const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authToken");
const { getDailyScore } = require("../controllers/scoreController");

// /api/worker/score-daily?date=0000-00-00
// 작업자 일일 점수 조회
/**
 * @swagger
 * /api/worker/score-daily:
 *   get:
 *     summary: 작업자 일일 점수 조회
 *     description: 지정된 날짜(date) 기준으로 작업자의 감지 기록, 위반 횟수, 감지 시간, 주간 등급을 조회합니다.
 *     tags:
 *       - Worker
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         description: 조회할 날짜 (YYYY-MM-DD 형식)
 *         schema:
 *           type: string
 *           example: "2025-08-07"
 *     responses:
 *       200:
 *         description: 일일 점수 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     violationTotal:
 *                       type: number
 *                       description: 총 미착용자 수
 *                       example: 5
 *                     recordedDuration:
 *                       type: string
 *                       description: 감지된 총 시간 (hh:mm:ss 형식)
 *                       example: "01:20:00"
 *                     weekly:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         average_score:
 *                           type: number
 *                           example: 6.3
 *                         grade:
 *                           type: string
 *                           example: "B+"
 *       401:
 *         description: 인증 실패 (토큰 누락 또는 유효하지 않음)
 *       500:
 *         description: 서버 오류
 */
router.get("/score-daily", verifyToken(), getDailyScore);

module.exports = router;