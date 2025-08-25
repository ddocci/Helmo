// src/components/statistics/SummaryCards.jsx
import React, { useState } from "react";
import "../../css/statistics/SummaryCards.css";

// 📌 등급 계산 함수
const getGrade = (avgRate) => {
  if (avgRate >= 95) return "A";
  if (avgRate >= 90) return "B";
  if (avgRate >= 80) return "C";
  return "D";
};

const SummaryCards = ({ avgRate, totalDetections, totalWearing }) => {
  const grade = getGrade(avgRate);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="summary-cards">
      <div className="card">
        <p>전체 착용률</p>
        <h3>{avgRate}%</h3>
      </div>
      <div className="card">
        <p>총 탐지 인원</p>
        <h3>{totalDetections}명</h3>
      </div>
      <div className="card">
        <p>총 착용 인원</p>
        <h3>{totalWearing}명</h3>
      </div>

      {/* 등급 카드 */}
      <div
        className="card grade-card"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <p>등급</p>
        <h3>{grade}</h3>

        {/* 툴팁 */}
        {showTooltip && (
          <div className="tooltip">
            <table>
              <thead>
                <tr>
                  <th>등급</th>
                  <th>기준 (착용률 %)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>95 이상</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>90 이상 ~ 94</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>80 이상 ~ 89</td>
                </tr>
                <tr>
                  <td>D</td>
                  <td>80 미만</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCards;
