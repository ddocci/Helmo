// routes/loginRouter.js
const express = require("express");
const router = express.Router();
const conn = require("../config/db");

router.post("/login", (req, res) => {
  const { id, password, role } = req.body;

  const sql = "SELECT * FROM USERS WHERE user_id = ? AND password = ?";
  conn.query(sql, [id, password], (err, results) => {
    if (err) {
      console.error("DB 오류:", err);
      return res.status(500).json({ success: false, message: "DB 오류" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "로그인 실패" });
    }

    const user = results[0];

    if (user.role !== role) {
      return res.status(403).json({ success: false, message: "권한 불일치" });
    }

    return res.json({
      success: true,
      userId: user.user_id,
      role: user.role,
      message: "로그인 성공",
    });
  });
});

module.exports = router;
