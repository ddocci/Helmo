const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require("../controllers/authController")
const authToken = require("../middlewares/authToken");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 사용자 로그인
 *     tags:
 *       - Auth
 *     description: ID, 비밀번호, 역할을 기반으로 로그인하고 JWT 토큰을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - password
 *               - role
 *             properties:
 *               id:
 *                 type: string
 *                 example: worker001
 *               password:
 *                 type: string
 *                 example: 1234
 *               role:
 *                 type: string
 *                 enum: [worker, admin]
 *                 example: worker
 *     responses:
 *       200:
 *         description: 로그인 성공 (JWT 토큰 포함)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     userId:
 *                       type: string
 *                       example: worker001
 *                     role:
 *                       type: string
 *                       example: worker
 *       401:
 *         description: 인증 실패 (아이디 또는 비밀번호 불일치)
 */
//로그인
router.post("/login", login);

//로그인 상태 확인
router.get("/me", authToken(), getMe);

//로그아웃
router.post("/logout", logout);

module.exports = router;