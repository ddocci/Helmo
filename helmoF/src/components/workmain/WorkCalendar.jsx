import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const WorkCalendar = ({ selectedDate, onChange, dailyData }) => {
  const formatDate = (date) => date.toISOString().split("T")[0];

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={selectedDate}
        locale="ko-KR"
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
