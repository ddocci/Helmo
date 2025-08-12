import React from 'react';

const EditDateScore = ({ year, month, day }) => {
  return (
    <div className="date-score">
      <h2>{year}년 {month}월 {day}일</h2>
      <div className="score-box">
        <span>15점</span>
        <p>일일 점수 최종</p>
      </div>
    </div>
  );
};

export default EditDateScore;
