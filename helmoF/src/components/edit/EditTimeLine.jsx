import React, { useState } from 'react';

const EditTimeline = ({ onSave }) => {
  const [reason, setReason] = useState('');

  const handleSave = () => {
    console.log("변경 사유:", reason);
    if (onSave) onSave(reason); // 부모 함수에 전달
  };

  return (
    <section className="timeline-section">
      <h3>타임별 이미지 관리</h3>
      <button className="edit-btn" onClick={handleSave}>저장하기</button>

      <div className="timeline-grid">
        {["09:00", "12:00", "15:00", "18:00"].map((time, idx) => (
          <div className="timeline-card" key={idx}>
            <p>{time}</p>
            <div className="image-placeholder">이미지가 없습니다</div>
          </div>
        ))}
      </div>

      <textarea
        className="timeline-reason"
        placeholder="추가, 수정사항 이유를 작성해주세요."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </section>
  );
};

export default EditTimeline;
