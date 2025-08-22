import React from "react";
import "../../css/Edit/DateScoreBox.css";

const DateScoreBox = () => {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="DateScoreBox">
      <div className="Date">{today}</div>
      <div className="Score">15점</div>
    </div>
  );
};

export default DateScoreBox;
