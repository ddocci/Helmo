const express = require("express");
const router = express.Router();

// 로그인 요청 처리
router.post("/login", (req, res) => {
  const { id, pw } = req.body;

  if (id === "admin" && pw === "1234") {
    res.json({ success: true, message: "로그인 성공" });
  } else {
    res.status(401).json({ success: false, message: "로그인 실패" });
  }
});

// 테스트용
router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

module.exports = router;
