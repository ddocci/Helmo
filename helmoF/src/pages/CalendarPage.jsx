import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/CalendarPage.css';
import '../css/Button.css';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddRecord = () => {
    const dateStr = selectedDate.toISOString().slice(0, 10); // 예: 2025-08-04
    // 실제론 여기에 모달을 띄우거나 API 요청을 넣어야 함
    alert(`${dateStr} 날짜에 기록을 추가합니다.`);
    // 예: axios.post('/api/add', { date: dateStr, ... })
  };

  const handleGoToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="calendar-container">
      <h2>📅 안전모 점검 기록</h2>

      <div className="calendar-button-group">
        <button className="Button Button_calendar" onClick={handleAddRecord}>
          기록 추가
        </button>
        <button className="Button Button_today" onClick={handleGoToday}>
          오늘로 이동
        </button>
      </div>

      <div className="calendar-wrapper">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </div>
    </div>
  );
}

export default CalendarPage;



