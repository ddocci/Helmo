import React from 'react';

const EditTimeline = ({ onRetouch }) => {
  return (
    <section className="timeline-section">
      <h3>타임별 이미지 관리</h3>
      <button className="edit-btn" onClick={onRetouch}>수정하기</button>
      <div className="timeline-grid">
        {["09:00", "12:00", "15:00", "18:00"].map((time, idx) => (
          <div className="timeline-card" key={idx}>
            <p>{time}</p>
            <div className="image-placeholder">이미지가 없습니다</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EditTimeline;
