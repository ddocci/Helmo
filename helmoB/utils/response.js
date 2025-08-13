// 공통 응답 포맷
module.exports = (res, {status = 200, success = true, message = '', data = null}) => {
    return res.status(status).json({success, message, data});
};