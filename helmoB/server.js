const express = require("express");
const cors = require("cors");
const { swaggerUi, swaggerSpec } = require("./swagger");

const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRouter');
const workerRoutes = require("./routes/workerRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(cors({
  origin: 'http://localhost:5173', // React 주소
  credentials: true // 로그인 인증 토큰용 쿠키 사용 허용
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));// Swagger UI 라우팅

// 로그인 라우터
app.use("/api", authRoutes);
// 작업자 라우터
app.use("/api/worker", workerRoutes)

app.get("/", (req, res) => {
  res.send("🟢 백엔드 서버 실행 중입니다!");
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중`);
  console.log(`Swagger 문서: http://localhost:${PORT}/api-docs`);
});