//날짜 계산 관련 포맷
// 해당 날짜가 몇 번째 주인지 구하는 함수
const getWeekNumber = (dateObj) => {
    return Math.ceil((dateObj.getDate() - 1 - dateObj.getDay()) / 7) + 1;
};

// 해당 날짜의 연도를 구하는 함수
const getScoreYear = (dateObj) => dateObj.getFullYear();

module.exports = {getWeekNumber, getScoreYear};