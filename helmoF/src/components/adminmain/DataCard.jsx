import React from 'react';

const DataCard = ({ selectedDate, selectedData }) => {
  return (
    <div className="cards-container">
      <div className="data-card">
        <h3>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</h3>
        <p>일별 점수: <strong>{selectedData.score}점</strong></p>
        <p>오늘 점수: <strong>{selectedData.people}명</strong></p>
        <p>감지 시간: <strong>{selectedData.hours}</strong></p>
      </div>

      <div className="data-card">
        <h3>주간 기록</h3>
        <p>등급: <strong>{selectedData.weeklyGrade}</strong></p>
        <p>평균: <strong>{selectedData.weeklyAvg}점</strong></p>
      </div>
    </div>
  );
};

export default DataCard;
