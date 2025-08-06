import React from 'react';
import Calendar from 'react-calendar';
import '../css/CalendarMain.css';

const CalendarMain = () => {
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      if (day === 9 || day === 13) {
        return <div className="badge blue">1점</div>;
      }
      if (day === 24) {
        return <div className="badge red">5점</div>;
      }
    }
    return null;
  };

  return (
    <div className="calendar-main">
      <h3>2023년 5월 27일</h3>
      <Calendar tileContent={tileContent} />
    </div>
  );
};

export default CalendarMain;