import React, { useState } from "react";
import Header from "../components/Header";
import Banner from "../components/AdminmainComponents/Banner";
import CalendarComponent from "../components/AdminmainComponents/Calendar";
import Result from "../components/AdminmainComponents/Result";

import "../css/Adminmain/Adminmain.css";

const AdminMain = () => {
  // ✅ 선택한 날짜 상태 (초기값: 오늘)
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ 캘린더에서 날짜 클릭 시 실행
  const handleDateClick = (date) => {
    setSelectedDate(date); // 📌 클릭한 날짜로 상태 변경
  };

  return (
    <div>
        {/* 헤더 */}
          <Header />
      <div className="AdminMain">

        {/* 상단 배너 */}
        <Banner />

        {/* 캘린더 (날짜 클릭 시 selectedDate 업데이트) */}
        <CalendarComponent onDateClick={handleDateClick} />

        {/* 결과 카드 (선택한 날짜 기반으로 변경) */}
        <div className="ResultContainer">
          <Result title="일별 기록" date={selectedDate} mode="daily" />
          <Result title="주간 기록" date={selectedDate} mode="weekly" />
          <Result title="월간 기록" date={selectedDate} mode="monthly" />
        </div>
      </div>
    </div>

  );
};

export default AdminMain;
