// src/components/statistics/AnalysisHeader.jsx
import React from "react";
import "../../css/statistics/AnalysisHeader.css";

const AnalysisHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="analysis-header">
      <h2>이미지 기반 안전모 착용 현황 분석</h2>
      <div className="tab-buttons">
        <button
          className={viewMode === "week" ? "active" : ""}
          onClick={() => setViewMode("week")}
        >
          주별 보기
        </button>
        <button
          className={viewMode === "month" ? "active" : ""}
          onClick={() => setViewMode("month")}
        >
          월별 보기
        </button>
      </div>
    </div>
  );
};

export default AnalysisHeader;
