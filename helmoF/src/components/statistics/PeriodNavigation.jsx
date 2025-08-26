// src/components/statistics/PeriodNavigation.jsx
import React from "react";
import "../../css/statistics/PeriodNavigation.css";

const PeriodNavigation = ({
  header,
  onPrev,
  onNext,
  onPeriodChange,
  options = [],
  viewMode,
  selectedValue, // ✅ 현재 선택된 값 (주차/월)
}) => {
  return (
    <div className="period-navigation">
      <button onClick={onPrev}>◀</button>
      <span className="period-header">{header}</span>
      <button onClick={onNext}>▶</button>

      {/* 📌 주별 / 월별 선택 */}
      {viewMode === "week" ? (
        <select
          className="period-select"
          value={selectedValue}
          onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="period-select"
          value={selectedValue}
          onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date().getFullYear()}년 {month}월
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PeriodNavigation;
