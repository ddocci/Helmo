const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

exports.login = async(req, res) => {
    const {id, password, role} = req.body;

    try{
        const [rows] = await db.query("SELECT * FROM users WHERE user_id=? AND role=?", [id, role]);
        if(rows.length === 0) {
            return res.json({success: false, message: "존재하지 않는 사용자"});
        }
        const user = rows[0];

        // // 비밀번호 해시 확인
        // const match = await bcrypt.compare(password, user.password);

        const match = await (password === user.password);
        if (!match) {
        return res.json({ success: false, message: '비밀번호 불일치' });
        }

        // jwt 토큰 발급
        const token = jwt.sign({userId: user.user_id, role:user.role}, process.env.JWT_SECRET, {
            expiresIn:"1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        });

        res.json({success: true, userId: user.user_id});
    } catch(err) {
        console.error(err);
        res.status(500).json({success:false, message:"서버 에러"});
    }
};

exports.getMe = (req, res) => {
    res.json({user: req.user});
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({success:true, message:"로그아웃"});
};