import React from 'react';

const EditDailyRecord = () => {
  return (
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
  );
};

export default EditDailyRecord;
