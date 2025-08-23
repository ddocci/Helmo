// Result.jsx
import React from "react";
import "../../css/Adminmain/Result.css";

const Result = ({ title, children, date, mode }) => {
  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    if (mode === "daily") {
      // 📌 일별 기록 → YYYY년 M월 D일
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    } else if (mode === "weekly") {
      // 📌 주간 기록 → YYYY년 M월 N째주
      const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
      const weekNumber = Math.ceil((d.getDate() + firstDay.getDay()) / 7);
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${weekNumber}째주`;
    }

    return "-";
  };

  return (
    <div className="ResultCard">
      <h3>{title}</h3>
      <p className="ResultDate">{formatDate(date)}</p>
      <div className="ResultContent">{children}</div>
    </div>
  );
};

export default Result;
