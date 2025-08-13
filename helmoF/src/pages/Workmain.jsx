import React, { useState, useContext } from 'react';
import "../css/Adminmain/AdminMain.css";
import "../css/Adminmain/AdminCalender.css";
import "../css/Adminmain/AdminCard.css";
import "../css/Adminmain/AdminHeader.css";
import "../css/Adminmain/AdminInfo.css";

import WorkerHeader from '../components/WorkerHeader.jsx';
// import WorkHeader from '../components/workmain/WorkHeader';
import WorkInfoBanner from '../components/workmain/WorkInfoBanner';
import WorkCalendar from '../components/workmain/WorkCalendar';
import WorkDataCard from '../components/workmain/WorkDataCard';

import axios from "../axios.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { makeHandleDateClick } from "../utils/getDailyScore.js";

const Workmain = () => {
  const { currentUser } = useContext(AuthContext);
  const role = currentUser?.role || "worker";

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
  
  const handleDateClick = makeHandleDateClick({
    role,
    setSelectedDate,
    setSelectedData,
    setLoading,
    setError,
  });



  return (
    <div className="admin-container">
      <WorkerHeader />
      <WorkInfoBanner />
      <WorkCalendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        onDateClick={handleDateClick}
        // dailyData={dailyData}
      />
      <WorkDataCard selectedDate={selectedDate} selectedData={selectedData} />
    </div>
  );
};

export default Workmain;
