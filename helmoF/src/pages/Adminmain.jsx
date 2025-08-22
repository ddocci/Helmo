import React from "react";
import Header from "../components/Header";
import Banner from "../components/AdminmainComponents/Banner";
import CalendarComponent from "../components/AdminmainComponents/Calendar";
import Result from "../components/AdminmainComponents/Result";

import "../css/Adminmain/Adminmain.css";

const AdminMain = () => {
  return (
    <div className="AdminMain">
      {/* 헤더만 좌우 꽉 차게 */}
      <div className="HeaderWrapper">
        <Header />
      </div>

      <Banner />
      <CalendarComponent />

      <div className="ResultContainer">
      <Result title="일별 기록" date={new Date()} mode="daily">
        <p>오늘 점수: 20점</p>
        <p>감지 시간: 14시간</p>
      </Result>

      <Result title="주간 기록" date={new Date()} mode="weekly">
        <p>등급: B+</p>
        <p>평균: 6.2점</p>
      </Result>
      </div>
    </div>
  );
};

export default AdminMain;
