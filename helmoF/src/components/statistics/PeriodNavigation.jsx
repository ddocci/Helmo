// src/components/statistics/PeriodNavigation.jsx
import React from "react";
import "../../css/statistics/PeriodNavigation.css";

const PeriodNavigation = ({ header, onPrev, onNext }) => {
  return (
    <div className="period-navigation">
      <button onClick={onPrev}>◀</button>
      <span>{header}</span>
      <button onClick={onNext}>▶</button>
    </div>
  );
};

export default PeriodNavigation;
