// config/db.js
const mysql = require("mysql2/promise");

// ⚠️ 비밀번호는 네 로컬 비번으로 바꿔
const pool = mysql.createPool({
  host: "127.0.0.1",   // 문자열!
  port: 3306,          // Workbench 스샷이 3306이었음 (3307 쓰면 3307로)
  user: "root",
  password: "1234",
  database: "sys",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});


module.exports = pool;
