import React from "react";
import "../css/Edit/editMain.css";
import "../css/Edit/editHeader.css";
import "../css/Edit/editButton.css";
import "../css/Edit/editForm.css";
import "../css/Edit/editTimeLine.css";
import "../css/Edit/editRecord.css";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

  const { date } = useParams();
  const choiceDate = new Date(date);
  const year = choiceDate.getFullYear();
  const month = String(choiceDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(choiceDate.getDate()).padStart(2, '0');
  
  const navigate = useNavigate();
  const handleBack = () => {
    // state로 선택한 날짜 전달
    navigate("/adminmain/:id");
  };

  const handleRetou = () => {
    // state로 선택한 날짜 전달
    navigate(`/retouch/${date}`, { state: { selectedDate: date } });
  };


  const handleMain = () => {
    // state로 선택한 날짜 전달
    navigate("/adminmain/:id");
  };

  const handleStatis = () => {
    // state로 선택한 날짜 전달
    navigate("/Statistics");
  };


  return (
    <div className="page-wrapper">
      <div className="edit-container">
        {/* 헤더 */}
        <header className="edit-header">
          <div className="e-header-left">
            <button className="back-btn" onClick={handleBack}>{"<"}</button>
            <div className="header-title">
              <p>{year}년 {month}월 {day}일 통계</p>
              <span>일별 기록 관리 및 추가</span>
            </div>
          </div>
          {/* 우측 로고 그대로 위치 (크기만 확대) */}
          <div className="header-logo">
            <img src="/logo.png" alt="Helmo" />
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="edit-main">
          <div className="date-score">
            <h2>{year}년 {month}월 {day}일</h2>
            <div className="score-box">
              <span>15점</span>
              <p>일일 점수 최종</p>
            </div>
          </div>

          <section className="timeline-section">
            <h3>타임별 이미지 관리</h3>
            <button className="edit-btn" onClick={handleRetou}>수정하기</button>
            <div className="timeline-grid">
              <div className="timeline-card">
                <p>09:00</p>
                <div className="image-placeholder">이미지가 없습니다</div>
              </div>
              <div className="timeline-card">
                <p>12:00</p>
                <div className="image-placeholder">이미지가 없습니다</div>
              </div>
              <div className="timeline-card">
                <p>15:00</p>
                <div className="image-placeholder">이미지가 없습니다</div>
              </div>
              <div className="timeline-card">
                <p>18:00</p>
                <div className="image-placeholder">이미지가 없습니다</div>
              </div>
            </div>
          </section>

          <section className="daily-record">
            <h3>일별 기록</h3>
            <div className="record-grid">
              <div className="record-item">
                <p>정상 계산</p>
                <span>보건 12점</span>
              </div>
              <div className="record-item">
                <p>기타 조치</p>
                <span>건강 21점</span>
              </div>
              <div className="record-item">
                <p>총합 점수</p>
                <span>63점</span>
              </div>
            </div>
            <div className="warning-box">
              <p>경고</p>
              <span>안전모 미착용 3회 -15점</span>
            </div>
          </section>

          <section className="weekly-record">
            <div className="weekly-item">
              <p>준수율</p>
              <h4>97.9%</h4>
            </div>
            <div className="weekly-item">
              <p>위반 건수</p>
              <h4>3회</h4>
            </div>
            <div className="weekly-item">
              <p>총 감지 수</p>
              <h4>2,156회</h4>
            </div>
          </section>

          <div className="bottom-buttons">
            <button className="main-btn" onClick={handleMain}>메인화면</button>
            <button className="stats-btn" onClick={handleStatis}>통계</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Edit;