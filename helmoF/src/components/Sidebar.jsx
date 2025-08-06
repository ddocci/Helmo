import React from 'react';
import Calendar from 'react-calendar';
import '../css/Sidebar.css';
import 'react-calendar/dist/Calendar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="mini-calendar">
        <Calendar />
      </div>
      <div className="daily-record">
        <h4>2023년 5월 27일</h4>
        <p>📌 오늘 점수: <span className="blue">20점</span></p>
        <p>⏰ 감점 시간: <span className="blue">14시</span></p>
        <p>📈 등급: B+ / <span className="avg-score">평균 6.2점</span></p>
      </div>
    </div>
  );
};

export default Sidebar;