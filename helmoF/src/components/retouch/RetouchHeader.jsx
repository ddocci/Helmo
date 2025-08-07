import React from 'react';

const RetouchHeader = ({ year, month, day }) => {
  return (
    <div className="retouch-header">
      <div className="retouch-date-info">
        <p className="retouch-subtitle">{year}년 {month}월 {day}일 수정</p>
        <p className="retouch-desc">일별 기록 수정</p>
      </div>
      <div className="retouch-logo"></div> {/* CSS 배경 */}
    </div>
  );
};

export default RetouchHeader;
