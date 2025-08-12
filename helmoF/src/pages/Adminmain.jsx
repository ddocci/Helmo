import React, { useState } from 'react';
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

const AdminMain = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastClickTime, setLastClickTime] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
      const formattedDate = date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");
      navigate(`/edit/${formattedDate}`);
    }
    setLastClickTime(now);
    setSelectedDate(date);
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
        dailyData={dailyData}
      />
      <DataCard selectedDate={selectedDate} selectedData={selectedData} />
    </div>
  );
};

export default AdminMain;
