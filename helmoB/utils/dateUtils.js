const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
const isoWeekday = require("dayjs/plugin/isoWeekday");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.extend(isoWeekday);

// ISO 기준: 해당 날짜의 연도 + 주차 구하기
const getYearAndWeek = (dateInput) => {
  const date = dayjs(dateInput);
  return {
    year: date.isoWeekYear(),  // ISO 연도
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
  getYearAndWeek,
  getYearAndMonth,
  getScoreYear,
  getMonth,
  getWeek,
  getIsoWeekRange,
  getMonthRange,
};