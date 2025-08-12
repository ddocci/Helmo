import React from 'react';
import Calendar from "react-calendar";
import "../../css/react-calendar-default.css";
import "../../css/Adminmain/AdminCalender.css";


const AdminCalendar = ({ selectedDate, onDateChange, onDayClick, dailyData }) => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        locale="ko-KR"
        calendarType="gregory"
        onClickDay={onDayClick}
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

export default AdminCalendar;
