import React from "react";
import "../../css/Edit/ScoreSummary.css";

const ScoreSummary = () => {
  return (
    <div className="ScoreSummary">
      <h3>일별 기록</h3>
      <div className="Stats">
        <div>보헌 12점</div>
        <div>건강 7점</div>
        <div>총점 19점</div>
      </div>
      <div className="Result">AI 분석 결과 반영됨</div>
    </div>
  );
};

export default ScoreSummary;
