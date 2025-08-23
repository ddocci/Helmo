import React from "react";
import { useParams } from "react-router-dom";
import "../../css/Edit/DateScoreBox.css";

const DateScoreBox = () => {
  const { date } = useParams(); // URL의 날짜 파라미터 가져오기

  // ✅ 선택한 날짜가 있으면 그대로 표시, 없으면 오늘 날짜
  const displayDate = date
    ? new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="DateScoreBox">
      <div className="Date">{displayDate}</div>
      <div className="Score">15점</div>
    </div>
  );
};

export default DateScoreBox;
