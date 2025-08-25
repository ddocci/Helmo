// HelmoB/routes/statistics.js
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // HelmoB/config/db.js 에서 MySQL 연결

// 📌 주별 데이터 가져오기
router.get("/week", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const [rows] = await db.query(
      `SELECT score_date, detected_count, wearing_count, wearing_rate
       FROM daily_score
       WHERE score_date BETWEEN ? AND ?
       ORDER BY score_date ASC`,
      [startDate, endDate]
    );

    let totalDetections = 0;
    let totalWearing = 0;
    let avgRate = 0;

    rows.forEach((r) => {
      totalDetections += r.detected_count;
      totalWearing += r.wearing_count;
      avgRate += parseFloat(r.wearing_rate);
    });

    avgRate = rows.length > 0 ? (avgRate / rows.length).toFixed(1) : 0;

    res.json({
      summary: {
        avgRate,
        totalDetections,
        totalWearing,
      },
      chart: rows.map((r) => ({
        date: r.score_date,
        rate: r.wearing_rate,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "주간 데이터 조회 실패" });
  }
});

// 📌 월별 데이터 가져오기
router.get("/month", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const [rows] = await db.query(
      `SELECT score_date, detected_count, wearing_count, wearing_rate
       FROM daily_score
       WHERE score_date BETWEEN ? AND ?
       ORDER BY score_date ASC`,
      [startDate, endDate]
    );

    let totalDetections = 0;
    let totalWearing = 0;
    let avgRate = 0;

    rows.forEach((r) => {
      totalDetections += r.detected_count;
      totalWearing += r.wearing_count;
      avgRate += parseFloat(r.wearing_rate);
    });

    avgRate = rows.length > 0 ? (avgRate / rows.length).toFixed(1) : 0;

    res.json({
      summary: {
        avgRate,
        totalDetections,
        totalWearing,
      },
      chart: rows.map((r) => ({
        date: r.score_date,
        rate: r.wearing_rate,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "월간 데이터 조회 실패" });
  }
});

module.exports = router;
