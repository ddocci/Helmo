const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(isoWeek);

// ISO 주차 연도 구하기(규칙: 해당 주의 목요일이 속한 연도)
const getIsoWeekYear = (dateInput) => {
  return dayjs(dateInput).isoWeekday(4).year();
};

// ISO 연/주 -> 임의의 요일(기본 수요일 = 3) 날짜 만들기
// isoWeek 1의 기준으로 1월 4일은 반드시 IsO 1주에 들어감
const dateFromIsoYearWeek = (isoYear, isoWeekNumber, isoWeekdayNumber = 3) => {
  const jan4 = dayjs(`${isoYear}-01-04`);
  return jan4.isoWeek(isoWeekNumber).isoWeekday(isoWeekdayNumber);
}

// ISO 기준: 해당 날짜의 연도 + 주차 구하기
const getYearAndWeek = (dateInput) => {
  const date = dayjs(dateInput);
  return {
    year: getIsoWeekYear(date),  // ISO 연도
    week: date.isoWeek(),      // ISO 주차
  };
};

// 연도 + 월 구하기
const getYearAndMonth = (dateInput) => {
  const date = dayjs(dateInput);
  return {
    year: date.year(),
    month: date.month() + 1,   // dayjs는 0~11 → +1 보정
  };
};

// 단일 항목 getter (필요 시)
const getScoreYear = (dateInput) => dayjs(dateInput).year();
const getMonth = (dateInput) => dayjs(dateInput).month() + 1;
const getWeek = (dateInput) => dayjs(dateInput).isoWeek();

// ISO 주의 월요일~일요일 범위
const getIsoWeekRange = (dateInput) => {
  const d = dayjs(dateInput);
  const start = d.isoWeekday(1).startOf("day"); // 월
  const end = d.isoWeekday(7).endOf("day");     // 일
  return { start, end };
};

// 월 시작~끝
const getMonthRange = (dateInput) => {
  const d = dayjs(dateInput);
  return { start: d.startOf("month"), end: d.endOf("month") };
};

module.exports = {
  dayjs,
  getIsoWeekYear,
  dateFromIsoYearWeek,
  getYearAndWeek,
  getYearAndMonth,
  getScoreYear,
  getMonth,
  getWeek,
  getIsoWeekRange,
  getMonthRange,
};