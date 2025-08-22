import React from "react";
import "../../css/Edit/MemoBox.css";

const MemoBox = () => {
  return (
    <div className="MemoBox">
      <textarea placeholder="메모를 입력하세요..." />
      <button>저장하기</button>
    </div>
  );
};

export default MemoBox;
