import React from 'react';
import '../css/AdminMain.css'; // CSS 따로 만들었다고 가정

const Adminmain = () => {
  return (
    <div className="admin-main-container">
      <h2>👷 관리자 대시보드</h2>

      <div className="admin-summary">
        <div className="summary-card">
          <h3>📅 오늘 점검 현황</h3>
          <p>총 감지 횟수: 124건</p>
          <p>미착용 사례: 15건</p>
        </div>

        <div className="summary-card">
          <h3>📈 이번 주 등급 평균</h3>
          <p>S등급: 3명</p>
          <p>A등급: 7명</p>
          <p>B등급 이하: 2명</p>
        </div>

        <div className="summary-card">
          <h3>🔔 최근 알림</h3>
          <ul>
            <li>08/05 - 미착용 알림 5건 등록</li>
            <li>08/04 - 새로운 사용자 1명 추가</li>
          </ul>
        </div>
      </div>

      <div className="admin-links">
        <button>📋 일별 기록 관리</button>
        <button>👥 사용자 관리</button>
        <button>📊 통계 페이지 이동</button>
      </div>
    </div>
  );
};

export default Adminmain;
