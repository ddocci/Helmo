import React from 'react';

const RetouchReasonSection = ({ reason, setReason }) => {
  return (
    <div className="retouch-section">
      <p className="retouch-section-title">수정 사유</p>
      <textarea
        className="retouch-textarea"
        placeholder="위치와 시간, 수정하는 이유를 적어주세요."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </div>
  );
};

export default RetouchReasonSection;
