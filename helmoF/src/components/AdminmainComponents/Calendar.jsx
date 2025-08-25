import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "../../css/Adminmain/Calendar.css";

const CalendarComponent = ({ onDateClick }) => {
  const navigate = useNavigate();
  const [hoveredDate, setHoveredDate] = useState(null);

  // ✅ 날짜 셀 커스터마이징
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString("sv-SE"); // YYYY-MM-DD
      return (
        <div
          className="DateTile"
          onMouseEnter={() => setHoveredDate(formattedDate)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {/* 날짜 숫자 */}
          <div className="DateNumber">{date.getDate()}</div>

          {/* hover 시 메뉴 */}
          {hoveredDate === formattedDate && (
            <div className="DateMenu">
              <button onClick={() => navigate(`/edit/${formattedDate}`)}>
                업로드
              </button>
              <button onClick={() => navigate(`/result/${formattedDate}`)}>
                결과보기
              </button>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="CalendarBox">
      <Calendar
        locale="ko-KR"
        prev2Label={null}
        next2Label={null}
        calendarType="gregory"
        formatDay={() => ""} // ✅ 날짜 숫자는 tileContent에서 직접 렌더링
        tileContent={tileContent}
        onClickDay={(value) => {
          // 📌 날짜 클릭 시 부모(AdminMain)에게 전달
          if (onDateClick) {
            onDateClick(value);
          }
        }}
      />
    </div>
  );
};

export default CalendarComponent;
