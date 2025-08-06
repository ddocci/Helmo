import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../css/Retouch/retouchMain.css";
import "../css/Retouch/retouchButton.css";
import "../css/Retouch/retouchHeader.css";
import "../css/Retouch/retouchSection.css";
import "../css/Retouch/retouchTimeLine.css";

const Retouch = () => {
 const [reason, setReason] = useState("");
 const navigate = useNavigate(); // 네비게이트 훅

 const { date } = useParams();
 const choiceDate = new Date(date);
  const year = choiceDate.getFullYear();
  const month = String(choiceDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(choiceDate.getDate()).padStart(2, '0');

  const handleSave = () => {
    if (window.confirm("저장되었습니다.")) {
      navigate(`/edit/${date}`);  // edit/:date로 이동
    }
    // API 저장 로직 추가 가능
  };

   return (
    <div className="retouch-wrapper">
      {/* 헤더 */}
      <div className="retouch-header">
        <div className="retouch-date-info">
          <p className="retouch-subtitle">{year}년 {month}월 {day}일 수정</p>
          <p className="retouch-desc">일별 기록 수정</p>
        </div>
        <div className="retouch-logo"></div> {/* 로고는 CSS 배경으로 처리 */}
      </div>

      {/* 본문 */}
      <div className="retouch-container">
        <h2 className="retouch-title">{year}년 {month}월 {day}일</h2>

        {/* 타임별 이미지 관리 */}
        <div className="retouch-section">
          <p className="retouch-section-title">타임별 이미지 관리</p>
          <div className="retouch-time-grid">
            {["오전 9시", "12시", "15:00", "오후 6시"].map((time, index) => (
              <div key={index} className="retouch-time-card">
                <p className="retouch-time">{time}</p>
                <div className="retouch-image-box">
                  <img
                    src="/images/no-image.png"
                    alt="이미지가 없습니다"
                    className="retouch-placeholder"
                  />
                  <p className="retouch-noimage-text">이미지가 없습니다</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 수정 사유 */}
        <div className="retouch-section">
          <p className="retouch-section-title">수정 사유</p>
          <textarea
            className="retouch-textarea"
            placeholder="위치와 시간, 수정하는 이유를 적어주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* 저장 버튼 */}
        <div className="retouch-button-wrapper">
          <button className="retouch-save-btn" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default Retouch