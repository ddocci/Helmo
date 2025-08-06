import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Adminmain/AdminMain.css";
import "../css/Adminmain/AdminCalender.css";
import "../css/Adminmain/AdminCard.css";
import "../css/Adminmain/AdminHeader.css";
import "../css/Adminmain/AdminInfo.css";
import "../css/Adminmain/statsButton.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminMain() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastClickTime, setLastClickTime] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();


  // 날짜별 점수 데이터
  const dailyData = {
    "2025-08-13": { score: 7, people: 18, hours: "12", weeklyGrade: "B+", weeklyAvg: "6.0" },
    "2025-08-24": { score: 15, people: 25, hours: "16", weeklyGrade: "A-", weeklyAvg: "7.2" },
    "2025-08-27": { score: 3, people: 20, hours: "14", weeklyGrade: "B+", weeklyAvg: "6.2" },
  };

  const formatDate = (date) => date.toISOString().split("T")[0];
  const selectedData = dailyData[formatDate(selectedDate)] || {
    score: "-",
    people: 0,
    hours: "-",
    weeklyGrade: "-",
    weeklyAvg: "-"
  };

  const handleDateClick = (date) => {
    const now = new Date().getTime();
    if (now - lastClickTime < 300) {
      // 더블클릭으로 판단
      const formattedDate = date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2, "0") + "-" +
      String(date.getDate()).padStart(2, "0");// yyyy-mm-dd 포맷
      navigate(`/edit/${formattedDate}`); // 수정 페이지로 이동
    }
    setLastClickTime(now);
    setSelectedDate(date);
  };
  
  const handleStatis = () => {
    // state로 선택한 날짜 전달
    navigate("/Statistics", { state: { date: selectedDate } });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-left"></div>
        <button className="stats-button" onClick={handleStatis}>통계 보기 →</button>
      </header>

      <div className="info-banner">
        날짜를 클릭하시면 상세 정보를 확인하실 수 있습니다.
      </div>
      

      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          locale="ko-KR"
          tileClassName={({ date }) => {
            const key = formatDate(date);
            if (dailyData[key]) {
              return dailyData[key].score >= 10 ? "has-score-high" : "has-score";
            }
            return null;
          }}
          onClickDay={handleDateClick}
        />
      </div>

      <div className="cards-container">
        <div className="data-card">
          <h3>{selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일</h3>
          <p>일별 점수: <strong>{selectedData.score}점</strong></p>
          <p>오늘 침수: <strong>{selectedData.people}명</strong></p>
          <p>감지 시간: <strong>{selectedData.hours}시간</strong></p>
        </div>

        <div className="data-card">
          <h3>주간 기록</h3>
          <p>등급: <strong>{selectedData.weeklyGrade}</strong></p>
          <p>평균: <strong>{selectedData.weeklyAvg}점</strong></p>
        </div>
      </div>
    </div>
  );
}
