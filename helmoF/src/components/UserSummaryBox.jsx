import React from 'react';

const UserSummaryBox = ({ selectedDate }) => {
  return (
    <div className="summary-box">
      <div className="daily">
        <h4>{selectedDate.toLocaleDateString()} 일일 기록</h4>
        <p>오늘 점수: <span className="blue">20점</span></p>
        <p>감점 시간: <span className="blue">14시</span></p>
      </div>
      <div className="weekly">
        <h4>주간 기록</h4>
        <p>등급: <strong>B+</strong></p>
        <p>평균: <span className="blue">6.2점</span></p>
      </div>
    </div>
  );
};

export default UserSummaryBox;
