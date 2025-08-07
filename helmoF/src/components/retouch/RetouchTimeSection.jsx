import React from 'react';

const RetouchTimeSection = () => {
  const timeLabels = ["오전 9시", "12시", "15:00", "오후 6시"];

  return (
    <div className="retouch-section">
      <p className="retouch-section-title">타임별 이미지 관리</p>
      <div className="retouch-time-grid">
        {timeLabels.map((time, index) => (
          <div key={index} className="retouch-time-card">
            <p className="retouch-time">{time}</p>
            <div className="retouch-image-box">
              <img
                src="/images/no-image.png"
                alt="이미지가 없습니다"
                className="retouch-placeholder"
              />
              <p className="retouch-noimage-text">이미지가 없습니다</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetouchTimeSection;
