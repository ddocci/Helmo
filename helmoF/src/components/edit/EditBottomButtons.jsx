import React from 'react';

const EditBottomButtons = ({ onMain, onStatistics }) => {
  return (
    <div className="bottom-buttons">
      <button className="main-btn" onClick={onMain}>메인화면</button>
      <button className="stats-btn" onClick={onStatistics}>통계</button>
    </div>
  );
};

export default EditBottomButtons;
