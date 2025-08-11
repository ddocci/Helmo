// middlewares/authToken.js
const jwt = require("jsonwebtoken");

// 쿠키(token) 또는 Authorization: Bearer 토큰 허용
function authToken(req, res, next) {
  const bearer = req.get("Authorization");
  const headerToken = bearer?.startsWith("Bearer ")
    ? bearer.slice(7)
    : undefined;

  const cookieToken = req.cookies?.token;
  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, role, iat, exp }
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authToken;
