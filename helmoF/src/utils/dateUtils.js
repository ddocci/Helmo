// src/utils/dateUtils.js
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function getWeekRange(date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday,
    end: sunday,
    label: `${format(monday, "yyyy년 M월", { locale: ko })} ${getWeekOfMonth(date)}주차`,
  };
}

export function getMonthRange(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start,
    end,
    label: format(start, "yyyy년 M월", { locale: ko }),
  };
}

function getWeekOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDay.getDay() || 7;
  return Math.ceil((date.getDate() + dayOfWeek - 1) / 7);
}
