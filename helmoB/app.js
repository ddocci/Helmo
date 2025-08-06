const express = require("express");
//Cross-Origin Resouce Sharing 교차 출처 리소스 공유
//기본적으로 웹 브라우저는 보안상 이유로 서버가 자기출처가 아닌 곳은
//데이터 요청을 막는다 그래서 CORS를 통해 서버와 프론트가 통신할수있게 해줌
//
const cors = require("cors");

const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
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

// 로그인 라우터
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("🟢 백엔드 서버 실행 중입니다!");
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중`);
});