// 토큰 검증 로직
const jwt = require("jsonwebtoken");
const sendREsponse = require("../utils/response");

const authToken = (allowedRoles = []) => {
    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return sendREsponse(res, {
                status: 401,
                success: false,
                message: "로그인이 필요합니다."
            });
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)){
                return sendREsponse(res, {
                    status: 403,
                    success: false,
                    message: "접근 권한이 없습니다."
                });
            }
            req.user = decoded;
            next();
        } catch(err){
            return sendREsponse(res, {
                status: 403,
                success: false,
                message: "유효하지 않은 토큰입니다."
            });
        }
    }
};

module.exports = authToken;