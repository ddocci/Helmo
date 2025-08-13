import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import "../css/Adminmain/AdminCalender.css";
import "../css/Adminmain/AdminMain.css";
import "../css/Adminmain/AdminCard.css";
import "../css/Adminmain/AdminHeader.css";
import "../css/Adminmain/AdminInfo.css";
import "../css/Adminmain/statsButton.css";

import Header from '../components/Header';
// import AdminHeader from '../components/adminmain/AdminHeader';
import InfoBanner from '../components/adminmain/InfoBanner';
import AdminCalendar from '../components/adminmain/AdminCalendar';
import DataCard from '../components/adminmain/DataCard';

import { AuthContext } from "../contexts/AuthContext";
import { makeHandleDateClick } from '../utils/getDailyScore';

const AdminMain = () => {
  const { currentUser } = useContext(AuthContext);
  const role = currentUser?.role || "admin";

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedData, setSelectedData] = useState({
    score: "-",
    people: "-",
    hours: "-",
    weeklyGrade: "-",
    weeklyAvg: "-"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [lastClickTime, setLastClickTime] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // const dailyData = {
  //   "2025-08-13": { score: 7, people: 18, hours: "12", weeklyGrade: "B+", weeklyAvg: "6.0" },
  //   "2025-08-24": { score: 15, people: 25, hours: "16", weeklyGrade: "A-", weeklyAvg: "7.2" },
  //   "2025-08-27": { score: 3, people: 20, hours: "14", weeklyGrade: "B+", weeklyAvg: "6.2" },
  // };

    const onDateFetch = useMemo( // handleDateClick 시 해당 날짜의 기록 조회, useMemo를 이용하여 배열 안의 값이 바뀌지 않으면 렌더링이 발생해도 재계산 하지 않음
      () =>
        makeHandleDateClick({
          role,
          setSelectedDate,
          setSelectedData,
          setLoading,
          setError,
        }),
      [role, setSelectedDate, setSelectedData, setLoading, setError]
    );

  const handleDateClick = (date) => {
    const now = new Date().getTime();
    if (now - lastClickTime < 300) {
      // const formattedDate = date.getFullYear() + "-" +
      //   String(date.getMonth() + 1).padStart(2, "0") + "-" +
      //   String(date.getDate()).padStart(2, "0");
      navigate(`/edit/${date}`);
      setLastClickTime(now);
      return;
    }
    setSelectedDate(date);

    onDateFetch(date);
  };

  const handleStatisticsClick = () => {
    navigate("/Statistics");
  };

  return (
    <div className="admin-container">
      <Header/>
      {/* <AdminHeader onStatisticsClick={handleStatisticsClick} /> */}
      <InfoBanner />
      <AdminCalendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onDayClick={handleDateClick}
        // dailyData={dailyData}
      />
      <DataCard selectedDate={selectedDate} selectedData={selectedData} />
    </div>
  );
};

export default AdminMain;