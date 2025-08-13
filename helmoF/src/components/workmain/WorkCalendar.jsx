import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {toYmdLocal} from "../../utils/dateToYmd";
const WorkCalendar = ({ selectedDate, onChange, dailyData = {}, onDateClick }) => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={selectedDate}
        onClickDay = {(date) => {
          onChange?.(date);
          const ymd = toYmdLocal(date);
          onDateClick?.(ymd);
        }}
        locale="ko-KR"
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
        formatMonthYear={(locale, date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`} // 문자열로!
        formatDay={(locale, date) => String(date.getDate())}  // ← 여기 추가!
        tileClassName={({ date }) => {
          const key = formatDate(date);
          if (dailyData[key]) {
            return dailyData[key].score >= 10 ? "has-score-high" : "has-score";
          }
          return null;
        }}
      />
    </div>
  );
};

export default WorkCalendar;
