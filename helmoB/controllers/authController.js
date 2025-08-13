const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // 해시 안쓰면 제거해도 됨
const db = require("../config/db"); // 네가 쓰는 커넥션 모듈

exports.login = async (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
    if (rows.length === 0) {
      return res.json({ success: false, message: "존재하지 않는 사용자" });
    }
    const user = rows[0];
    console.log(user.role);

    // 평문 비교 (해시라면 bcrypt.compare 사용)
    const match = password === user.password;
    if (!match) {
      return res.json({ success: false, message: "비밀번호 불일치" });
    }

    const role = user.role;
    const token = jwt.sign({ userId: user.user_id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 프록시로 같은 오리진처럼 보이게 하므로 lax/false로 충분
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 1000 * 60 * 60, // 1h
    });

    return res.json({ success: true, userId: user.user_id, role });
  } catch (err) {
    console.error("[login error]", err);
    return res.status(500).json({ success: false, message: "서버 에러" });
  }
};

exports.getMe = (req, res) => {
  // auth 미들웨어가 req.user 세팅
  return res.json({ user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  return res.json({ success: true, message: "로그아웃" });
};
