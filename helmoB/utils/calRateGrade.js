// 착용률 계산
const calComplianceRate = (total_detection = 0, total_violation = 0) => {
    const td = Number(total_detection) || 0;
    const tv = Number(total_violation) || 0;
    const rate = td > 0 ? ((td - tv) / td) * 100 : 100;
    return {td, tv, rate: Number(rate.toFixed(2))};
};

// 등급 계산
const gradeByCompliance = (rate) => {
    if (rate == 0) return "-"; // 아직 기록이 없을 때

    if (rate >= 97) return "A+";
    else if (rate >= 94) return "A";
    else if (rate >= 90) return "B+";
    else if (rate >= 85) return "B";
    else if (rate >= 80) return "C+";
    else return "C";
};

module.exports = {calComplianceRate, gradeByCompliance};