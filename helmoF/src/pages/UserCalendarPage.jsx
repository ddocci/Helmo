import React, { useState } from 'react';
import Calendar from 'react-calendar';
import UserNavbar from '../components/UserNavbar';
import UserSummaryBox from '../components/UserSummaryBox';
import 'react-calendar/dist/Calendar.css';
import '../css/UserCalendarPage.css';

const UserCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      if (day === 1 || day === 13) return <div className="badge blue">1점</div>;
      if (day === 24) return <div className="badge red">5점</div>;
      if (day === 27) return <div className="badge yellow">오늘</div>;
    }
    return null;
  };

  return (
    <div className="user-page-container">
      <UserNavbar />
      <div className="calendar-section">
        <h3>2023년 5월 27일</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
        <UserSummaryBox selectedDate={selectedDate} />
        <p className="notice">※ 당일 사용자만 점검 정보를 조회할 수 있습니다.</p>
      </div>
    </div>
  );
};

export default UserCalendarPage;
