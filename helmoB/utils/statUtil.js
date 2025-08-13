const db = require("../config/db");
const { getYearAndWeek, getYearAndMonth, getIsoWeekRange, getMonthRange } = require("./dateUtils");

// 통계 계산 포맷
// rows : db에서 추출한 행, key: 통계를 계산할 컬럼명, conditionFn: 특정 행을 대상으로 할 때 조건, option: 구할 통계 옵션
const getConditionalStat = (rows, key, conditionFn = ()=>true, options = {mode: "total"}) => {
    const mode = options.mode || "total";

    let total = 0;
    let count = 0;
    let max = -Infinity;

    for (const row of rows) {
        if(!conditionFn(row)) continue;
        const value = row[key] || 0;
        total += value;
        count++;
        if (value > max) max = value;
    }

    switch (mode) {
        case "total":
            return total;
        case "average":
            return count === 0 ? 0 : total / count;
        case "max":
            return count === 0 ? null : max;
        case "ratio": // 전체에서 특정 조건을 만족하는 데이터의 비율
            const grandTotal = rows.reduce((sum, row) => sum + (row[key] || 0), 0);
            return grandTotal === 0 ? 0 : (total / grandTotal) * 100;
        default:
            throw new Error(`Unknown mode: ${mode}`);
    }
};


module.exports = {getConditionalStat}