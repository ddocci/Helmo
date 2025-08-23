// helmoB/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const db = require("./config/db");
const authRoutes = require("./routes/authRouter");
const uploadRoutes = require("./routes/upload");

const app = express();

// 미들웨어
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// 정적 파일
app.use("/uploads", express.static("uploads"));

// 라우트
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);

// ✅ AI 분석 요청 API
app.get("/api/analyze/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const response = await axios.get(`http://localhost:8000/analyze?date=${date}`);
    res.json(response.data);
  } catch (err) {
    console.error("AI 서버 호출 오류:", err.message);
    res.status(500).json({ error: "AI 분석 실패" });
  }
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));

module.exports = app;
