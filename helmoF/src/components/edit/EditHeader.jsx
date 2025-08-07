import React from 'react';

const EditHeader = ({ year, month, day, onBack }) => {
  return (
    <header className="edit-header">
      <div className="e-header-left">
        <button className="back-btn" onClick={onBack}>{"<"}</button>
        <div className="header-title">
          <p>{year}년 {month}월 {day}일 통계</p>
          <span>일별 기록 관리 및 추가</span>
        </div>
      </div>
      <div className="header-logo">
        <img src="/logo.png" alt="Helmo" />
      </div>
    </header>
  );
};

export default EditHeader;
