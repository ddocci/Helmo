const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authToken");
const { getDailyScore } = require("../controllers/dailyScoreController");
const { getWeeklyStatistics } = require("../controllers/weeklyStatController");
const { getMonthlyStatistics } = require("../controllers/monthlyStatController");

// /api/admin/score-daily?date=0000-00-00
// 관리자 일일 점수
router.get("/score-daily", verifyToken(["admin"]), getDailyScore);

// 관리자 주간 통계
router.get("/weekly-stat", verifyToken(["admin"]), getWeeklyStatistics);

// 관리자 월간 통계
router.get("monthly-stat", verifyToken(["admin"]), getMonthlyStatistics);

module.exports = router;