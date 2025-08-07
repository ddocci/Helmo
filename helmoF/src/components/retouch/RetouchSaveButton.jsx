import React from 'react';

const RetouchSaveButton = ({ onSave }) => {
  return (
    <div className="retouch-button-wrapper">
      <button className="retouch-save-btn" onClick={onSave}>
        저장
      </button>
    </div>
  );
};

export default RetouchSaveButton;
