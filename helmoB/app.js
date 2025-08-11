// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/db");
const authRoutes = require("./routes/authRouter");

const app = express();                 // ← app 생성 먼저!

// 미들웨어
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


// API 라우트
app.use("/api", authRoutes);

// 헬스체크
app.get("/", (_req, res) => res.send("🟢 Backend running"));

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));

module.exports = app;
