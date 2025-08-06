import React from 'react';
import UserNavbar from '../components/UserNavbar';
import UserSummaryBox from '../components/UserSummaryBox';
import UserCalendarPage from '../components/UserCalendarPage';
import '../css/CalendarDashboard.css';

const CalendarDashboard = () => {
  return (
    <div className="calendar-dashboard">
      {/* 상단 네비게이션 */}
      <UserNavbar />

      {/* 메인 콘텐츠 */}
      <div className="dashboard-content">
        {/* 요약 박스 */}
        <UserSummaryBox totalScore={280} grade="A" month="8월" />

        {/* 달력 */}
        <UserCalendarPage />
      </div>
    </div>
  );
};

export default CalendarDashboard;

