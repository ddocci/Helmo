import React, { useRef } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "../../css/Adminmain/Calendar.css";

const CalendarComponent = () => {
  const navigate = useNavigate();
  const clickTimeout = useRef(null); // 클릭 타이머 저장용 ref

  // 날짜 클릭 시 실행
  const handleDayClick = (date) => {
    if (clickTimeout.current) {
      // 두 번째 클릭(=더블클릭)
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;

      const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
      navigate(`/edit/${formattedDate}`); // ✅ 해당 날짜로 이동
    } else {
      // 첫 번째 클릭 시 타이머 시작
      clickTimeout.current = setTimeout(() => {
        clickTimeout.current = null;
      }, 250); // 0.25초 안에 또 클릭되면 더블클릭으로 인식
    }
  };

  return (
    <div className="CalendarBox">
      <Calendar
        onClickDay={handleDayClick}
        locale="ko-KR"
        prev2Label={null}
        next2Label={null}
        calendarType="gregory" // 주 시작 요일 월요일
        // ✅ 날짜에서 '일' 제거하고 숫자만 표시
        formatDay={(locale, date) => date.getDate()}
      />
    </div>
  );
};

export default CalendarComponent;
