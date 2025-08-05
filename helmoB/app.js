const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const loginRouter = require("./routes/loginRouter");

// 정적 파일 서빙 (Vite로 빌드된 React 앱)
app.use(express.static(path.join(__dirname, "../helmoF/dist")));

// POST 요청용 바디 파서
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// API 라우터 연결
app.use("/api", loginRouter);

// React SPA 지원 - 나머지는 index.html 반환
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../helmoF/dist/index.html"));
});

// 서버 실행
app.listen(3000, () => {
  console.log("✅ 서버 실행 중: http://localhost:3000");
});
