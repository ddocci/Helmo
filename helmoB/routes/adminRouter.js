const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authToken");
const { getDailyScore } = require("../controllers/dailyScoreController");
const { getWeeklyStatistics } = require("../controllers/weeklyStatController");
const { getMonthlyStatistics } = require("../controllers/monthlyStatController");


/**
 * @swagger
 * /api/admin/score-daily:
 *   get:
 *     summary: 관리자 일일 점수
 *     description: 특정 날짜의 일일 점수와 통계 반환
 *     tags: [AdminStats]
 *     security:
 *       - cookieAuth: []
 *       # - bearerAuth: []   # Authorization 헤더 사용 시 활성화
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: YYYY-MM-DD
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyScoreResponse'
 *       401:
 *         description: 인증 실패 (토큰 없음/만료)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: 권한 부족 (admin 아님)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/admin/weekly-stat:
 *   get:
 *     summary: 관리자 주간 통계
 *     description: 로그인한 관리자에 대한 주간 통계 반환
 *     tags: [AdminStats]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: 기준 날짜(해당 주를 계산). 없으면 서버 기본값 사용.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeeklyStatisticsResponse'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: 권한 부족 (admin 아님)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/admin/monthly-stat:
 *   get:
 *     summary: 관리자 월간 통계
 *     description: 로그인한 관리자에 대한 월간 통계 반환
 *     tags: [AdminStats]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: YYYY-MM-DD
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: integer
 *         description: 대상 연도(기본값은 서버 결정)
 *       - in: query
 *         name: month
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: 대상 월(1–12, 기본값은 서버 결정)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MonthlyStatisticsResponse'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: 권한 부족 (admin 아님)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// /api/admin/score-daily?date=0000-00-00
// 관리자 일일 점수
router.get("/score-daily", verifyToken(["admin"]), getDailyScore);

// 관리자 주간 통계
router.get("/weekly-stat", verifyToken(["admin"]), getWeeklyStatistics);

// 관리자 월간 통계
router.get("/monthly-stat", verifyToken(["admin"]), getMonthlyStatistics);

module.exports = router;