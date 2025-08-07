// utils/dateUtils.js
const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);

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

module.exports = {
  getYearAndWeek,
  getYearAndMonth,
  getScoreYear,
  getMonth,
  getWeek,
};