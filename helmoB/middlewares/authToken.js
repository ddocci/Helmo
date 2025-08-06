// 토큰 검증 로직
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => { 
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: "존재하지 않는 토큰"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(403).json({message: "유효하지 않은 토큰"});
    }
};

module.exports = authToken;