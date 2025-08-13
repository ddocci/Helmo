// 두 시간 사이의 차이를 구하는 함수
exports.getTimeDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diffMs = end - start; // 두 시간 사이의 차(마이크로초 단위)

    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffM = Math.floor((diffMs%(1000 * 60 * 60)) / (1000 * 60));
    return `${diffH}시간 ${diffM}분`;
};