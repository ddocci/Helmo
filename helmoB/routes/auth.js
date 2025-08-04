const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { id, password, role } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ? AND role = ?', [id, role]);
    if (rows.length === 0) {
      return res.json({ success: false, message: '사용자 없음' });
    }

    const user = rows[0];
    // 비밀번호 bcrypt 해싱 사용 시
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) {
    //   return res.json({ success: false, message: '비밀번호 불일치' });
    // }

    // 비밀번호 해싱 사용 x
    if (user.password !== password) {
        return res.json({ success: false, message: '비밀번호 틀림' });
    }

    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // 배포 시 true로 설정
    });

    res.json({ success: true, userId: user.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 에러' });
  }
});

module.exports = router;