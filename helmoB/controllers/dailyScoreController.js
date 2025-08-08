const db = require("../config/db");
const sendResponse = require("../utils/response");
const {getWeek, getScoreYear} = require("../utils/dateUtils");
const { getTimeDuration } = require("../utils/timeUtils");
const { getConditionalStat } = require("../utils/statUtil");
const { getDailyScores, getWeeklyScores } = require("../services/getScoreService");

exports.getDailyScore = async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const { date } = req.query;

    try {
        let violationTotal = null;
        let firstTime = null;
        let lastTime = null;
        let duration = null;

        const [rows] = await getDailyScores(role, userId, date);

        if(rows.length !== 0){
            violationTotal = getConditionalStat(rows, "violation_count", () => true, {mode: "total"});
            firstTime = rows[0].time_slot;
            lastTime = rows[rows.length - 1].time_slot;
            duration = getTimeDuration(firstTime, lastTime);
        }

        const dateObj = new Date(date);
        const weekNumber = getWeek(dateObj);
        const scoreYear = getScoreYear(dateObj);

        const [weeklyRow] = await getWeeklyScores(role, userId, scoreYear, weekNumber);
        
        if(rows.length === 0 && weeklyRow.length === 0){ // 당일 기록도 없고, 그 주의 기록도 없는 경우 (ex-다음 달 등 미래)
            return sendResponse(res, {data: null});
        } else if(rows.length === 0){ // 당일 기록은 없지만, 그 주의 기록은 있는 경우 (ex-주말 등 작업이 없는 날)
            return sendResponse(res, {data: {violationTotal: 0, recordedDuration: "00시간 00분", weekly: weeklyRow[0] || null}});
        } else{ // 일반적인 작업이 있었던 날의 경우
            return sendResponse(res, {
                data: {
                    violationTotal,
                    recordedDuration: duration,
                    weekly: weeklyRow[0] || null,
                }
            });
        }
    } catch (err) {
        console.error("/worker/score-daily error", err);
        return sendResponse(res, {status:500, success:false, message: "서버 오류"});
    }
}