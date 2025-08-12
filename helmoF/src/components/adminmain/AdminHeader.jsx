import React from 'react';

const AdminHeader = ({ onStatisticsClick }) => {
  return (
    <header className="admin-header">
      <div className="header-left"></div>
      <button className="stats-button" onClick={onStatisticsClick}>
        통계 보기 →
      </button>
    </header>
  );
};

export default AdminHeader;
