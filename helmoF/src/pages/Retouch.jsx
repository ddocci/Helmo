import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "../css/Retouch/retouchMain.css";
import "../css/Retouch/retouchButton.css";
import "../css/Retouch/retouchHeader.css";
import "../css/Retouch/retouchSection.css";
import "../css/Retouch/retouchTimeLine.css";

import RetouchHeader from '../components/retouch/RetouchHeader';
import RetouchTitle from '../components/retouch/RetouchTitle';
import RetouchTimeSection from '../components/retouch/RetouchTimeSection';
import RetouchReasonSection from '../components/retouch/RetouchReasonSection';
import RetouchSaveButton from '../components/retouch/RetouchSaveButton';

const Retouch = () => {
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const { date } = useParams();

  const choiceDate = new Date(date);
  const year = choiceDate.getFullYear();
  const month = String(choiceDate.getMonth() + 1).padStart(2, '0');
  const day = String(choiceDate.getDate()).padStart(2, '0');

  const handleSave = () => {
    if (window.confirm("저장되었습니다.")) {
      navigate(`/edit/${date}`);
    }
    // API 저장 로직 가능
  };

  return (
    <div className="retouch-wrapper">
      <RetouchHeader year={year} month={month} day={day} />
      <div className="retouch-container">
        <RetouchTitle year={year} month={month} day={day} />
        <RetouchTimeSection />
        <RetouchReasonSection reason={reason} setReason={setReason} />
        <RetouchSaveButton onSave={handleSave} />
      </div>
    </div>
  );
};

export default Retouch;
