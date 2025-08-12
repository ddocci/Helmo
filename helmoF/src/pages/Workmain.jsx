import React, { useState } from 'react';
import "../css/Adminmain/AdminMain.css";
import "../css/Adminmain/AdminCalender.css";
import "../css/Adminmain/AdminCard.css";
import "../css/Adminmain/AdminHeader.css";
import "../css/Adminmain/AdminInfo.css";

import Header from '../components/Header';
// import WorkHeader from '../components/workmain/WorkHeader';
import WorkInfoBanner from '../components/workmain/WorkInfoBanner';
import WorkCalendar from '../components/workmain/WorkCalendar';
import WorkDataCard from '../components/workmain/WorkDataCard';

const Workmain = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  return (
    <div className="admin-container">
      <Header />
      <WorkInfoBanner />
      <WorkCalendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        dailyData={dailyData}
      />
      <WorkDataCard selectedDate={selectedDate} selectedData={selectedData} />
    </div>
  );
};

export default Workmain;
