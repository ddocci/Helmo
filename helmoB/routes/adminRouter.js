const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authToken");
const { getDailyScore } = require("../controllers/dailyScoreController")

// /api/admin/score-daily?date=0000-00-00
// 관리자 일일 점수
router.get("/score-daily", verifyToken(["admin"]), getDailyScore);

module.exports = router;