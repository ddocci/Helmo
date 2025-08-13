import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import "../css/Edit/editMain.css";
import "../css/Edit/editHeader.css";
import "../css/Edit/editButton.css";
import "../css/Edit/editForm.css";
import "../css/Edit/editTimeLine.css";
import "../css/Edit/editRecord.css";

import Header from '../components/Header';
// import EditHeader from '../components/edit/EditHeader';
import EditDateScore from '../components/edit/EditDateScore';
import EditTimeline from '../components/edit/EditTimeLine';
import EditDailyRecord from '../components/edit/EditDailyRecord';
import EditWeeklyRecord from '../components/edit/EditWeeklyRecord';
import EditBottomButtons from '../components/edit/EditBottomButtons';

const Edit = () => {
  const { date } = useParams();
  const choiceDate = new Date(date);
  const year = choiceDate.getFullYear();
  const month = String(choiceDate.getMonth() + 1).padStart(2, '0');
  const day = String(choiceDate.getDate()).padStart(2, '0');

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleBack = () => navigate(`/adminmain`);
  // const handleRetouch = () => navigate(`/retouch/${date}`, { state: { selectedDate: date } });
  const handleMain = () => navigate(`/adminmain`);
   const handleStatistics = () => navigate("/Statistics", {state: {date: choiceDate}});

  return (
    <div className="page-wrapper">
      <div className="edit-container">
        {/* <EditHeader year={year} month={month} day={day} onBack={handleBack} /> */}
        <Header/>
        <main className="edit-main">
          <EditDateScore year={year} month={month} day={day} />
          <EditTimeline onSave={(reason) => {
            alert("저장되었습니다.");
            console.log("입력된 변경사유 :", reason);
          }} />
          <EditDailyRecord />
          <EditWeeklyRecord />
          <EditBottomButtons onMain={handleMain} onStatistics={handleStatistics} />
        </main>
      </div>
    </div>
  );
};

export default Edit;
