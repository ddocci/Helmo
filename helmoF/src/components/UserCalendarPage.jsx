import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/UserCalendarPage.css';

const UserCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayData, setDayData] = useState({
    score: '-',
    time: '-',
    grade: '-',
  });

  const fakeData = {
    '2025-08-06': { score: '10점', time: '14:00', grade: 'A' },
    '2025-08-07': { score: '3점', time: '09:00', grade: 'B' },
    '2025-08-08': { score: '7점', time: '16:00', grade: 'B+' },
  };

  const handleDateClick = (date) => {
    const formatted = date.toISOString().split('T')[0];
    setSelectedDate(formatted);
    setDayData(fakeData[formatted] || { score: '-', time: '-', grade: '-' });
  };

  return (
    <div className="user-calendar-container">
      <h2>📅 내 안전모 점검 기록</h2>

      <Calendar onClickDay={handleDateClick} />

      {selectedDate && (
        <div className="day-info">
          <h3>{selectedDate} 기록</h3>
          <p>점수: {dayData.score}</p>
          <p>시간: {dayData.time}</p>
          <p>등급: {dayData.grade}</p>
        </div>
      )}
    </div>
  );
};

export default UserCalendarPage;
