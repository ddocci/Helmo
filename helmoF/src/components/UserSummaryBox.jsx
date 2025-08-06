import React from 'react';
import '../css/UserSummaryBox.css';

const UserSummaryBox = ({ totalScore, grade, month }) => {
  return (
    <div className="user-summary-box">
      <h3>{month} 요약</h3>
      <p>총 점수: {totalScore}점</p>
      <p>등급: {grade}</p>
    </div>
  );
};

export default UserSummaryBox;
