import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// ✅ 날짜를 "2025년 8월 5일" 형식으로 바꾸는 함수
const formatKoreanDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};

const CalendarMain = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayData, setDayData] = useState({
    score: '-',
    time: '-',
    grade: '-',
  });

  const fakeData = {
    '2023-05-27': { score: '20점', time: '14시', grade: 'B+' },
    '2025-08-09': { score: '1점', time: '09시', grade: 'C' },
    '2025-08-24': { score: '5점', time: '16시', grade: 'C+' },
  };

  // 날짜 클릭 시 데이터 설정
  const handleDateClick = (date) => {
    const formatted = date.toISOString().split('T')[0];
    console.log("🗓 선택된 날짜:", formatted);
    setSelectedDate(formatted);

    const data = fakeData[formatted] || generateDefaultData(formatted);
    setDayData(data);
  };

  // 기본 점수 생성 (데이터가 없을 경우)
  const generateDefaultData = (dateStr) => {
    const dateNumber = parseInt(dateStr.split('-')[2]);
    const score = (dateNumber * 3) % 30 + 1;
    const hour = (dateNumber * 2) % 24;
    const grade = score >= 25 ? 'A' : score >= 15 ? 'B+' : 'C';

    return {
      score: `${score}점`,
      time: `${hour}시`,
      grade: grade,
    };
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* 왼쪽 기록 박스 */}
      <div style={{
        width: '250px',
        backgroundColor: '#f3f6fa',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 0 8px rgba(0,0,0,0.05)'
      }}>
        <h3>
          {selectedDate ? `${formatKoreanDate(selectedDate)} 기록` : '날짜를 선택하세요'}
        </h3>
        <p>📌 오늘 점수: <strong>{dayData.score}</strong></p>
        <p>⏰ 감점 시간: <strong>{dayData.time}</strong></p>
        <p>📊 등급: <strong>{dayData.grade}</strong></p>
      </div>

      {/* 오른쪽 달력 */}
      <div>
        <Calendar onClickDay={handleDateClick} />
      </div>
    </div>
  );
};

export default CalendarMain;
