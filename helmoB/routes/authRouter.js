const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require("../controllers/authController")
const authToken = require("../middlewares/authToken");

//로그인
router.post("/login", login);

//로그인 상태 확인
router.get("/me", authToken, getMe);

//로그아웃
router.post("/logout", logout);

module.exports = router;