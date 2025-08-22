import React, { useEffect, useRef, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../css/Statistics/statistics.css";

import Header from "../components/Header";

// Chart.js 요소 등록
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const location = useLocation();
  const pdfRef = useRef();
  const navigate = useNavigate();   // ✅ 라우터 이동

  // AdminMain에서 받은 날짜 (없으면 오늘)
  const passedDate = location.state?.date ? new Date(location.state.date) : new Date();
  const [year, setYear] = useState(passedDate.getFullYear());
  const [month, setMonth] = useState(passedDate.getMonth() + 1); // JS는 0~11이라 +1
  const [viewMode, setViewMode] = useState("month");
  const [statisticsData, setStatisticsData] = useState({});

  // 더미 데이터
  const monthlyData = {
    cards: { helmetRate: 98.5, incidents: 43, workers: 142 },
    line: [95.2, 96.3, 97.1, 98.0, 98.5],
    bar: [6, 4, 3, 5],
    pie: [99.2, 97.8, 96.5, 94.1],
  };
  const yearlyData = {
    cards: { helmetRate: 96.8, incidents: 512, workers: 1700 },
    line: [92.5, 94.3, 95.1, 96.4, 96.8],
    bar: [25, 18, 10, 14],
    pie: [97.2, 95.8, 94.5, 92.1],
  };

  useEffect(() => {
    setStatisticsData(viewMode === "month" ? monthlyData : yearlyData);
  }, [viewMode, year, month]);

  // 페이지 이동
  const goToMain = () => navigate("/adminmain");
  const goToEdit = () => {
    if(year === passedDate.getFullYear() && month === passedDate.getMonth() + 1){
      navigate(`/edit/${year}-${String(month).padStart(2,0)}-${passedDate.getDate()}`);
    } else {
      navigate(`/edit/${year}-${String(month).padStart(2,0)}-01`);
    }
  };
    

  // PDF 저장
  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.3,
      filename: `${year}년_${month}월_안전모통계.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // 월 이동
  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  // 연도 단위 이동
  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  // 현재 월의 마지막 일 구하기
const getLastDayOfMonth = (y, m) => new Date(y, m, 0).getDate(); // m은 1~12

// 라벨 & 데이터
const lineLabels =
  viewMode === "month"
    ? Array.from({ length: getLastDayOfMonth(year, month) }, (_, i) => `${i + 1}일`)
    : Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

const lineData = {
  labels: lineLabels,
  datasets: [
    {
      label: "착용률(%)",
      data:
        viewMode === "month"
          ? Array.from({ length: getLastDayOfMonth(year, month) }, () =>
              (95 + Math.random() * 5).toFixed(1)
            ) // 랜덤 더미데이터
          : [92.5, 94.3, 95.1, 96.0, 96.8, 97.1, 97.5, 98.0, 97.8, 97.6, 97.9, 98.1],
      fill: false,
      borderColor: "#4a6ef5",
      tension: 0.3,
    },
  ],
};

  const barData = {
    labels: ["08:00-10:00", "11:00-13:00", "14:00-16:00", "16:00-18:00"],
    datasets: [
      {
        label: "미착용 인원수",
        data: statisticsData.bar || [],
        backgroundColor: "#6c8cf7",
      },
    ],
  };

  return (
    <div className="statistics-wrapper" ref={pdfRef}>
      <Header/>
      {/* <div className="statistics-header">
        <h2>전체 통계</h2>
        <img src="/logo.png" alt="Helmo Logo" className="statistics-logo" />
      </div> */}

      <div className="statistics-summary">
        <h3>이미지 기반 안전모 착용 현황 분석</h3>
        <div className="summary-controls">
          {/* 왼쪽: 월별 / 연도별 버튼 */}
          <div className="left-controls">
            <button
              className={`summary-btn ${viewMode === "month" ? "active" : ""}`}
              onClick={() => setViewMode("month")}
            >
              월별 보기
            </button>
            <button
              className={`summary-btn ${viewMode === "year" ? "active" : ""}`}
              onClick={() => setViewMode("year")}
            >
              연도별 보기
            </button>
          </div>
        </div>

        {/* 네비게이션 */}
        {viewMode === "month" ? (
          <div className="month-navigation">
            <button className="nav-btn" onClick={handlePrevMonth}>◀</button>
            <h4 className="summary-year">{`< ${year}년 ${month}월 >`}</h4>
            <button className="nav-btn" onClick={handleNextMonth}>▶</button>
          </div>
        ) : (
          <div className="month-navigation">
            <button className="nav-btn" onClick={handlePrevYear}>◀</button>
            <h4 className="summary-year">{`< ${year}년 >`}</h4>
            <button className="nav-btn" onClick={handleNextYear}>▶</button>
          </div>
        )}

        <div className="summary-cards">
          <div className="summary-card">
            <p className="summary-title">전체 안전모 착용률</p>
            <p className="summary-value">{statisticsData.cards?.helmetRate || 0}%</p>
          </div>
          <div className="summary-card">
            <p className="summary-title">총 안전사고 건수</p>
            <p className="summary-value">{statisticsData.cards?.incidents || 0}건</p>
          </div>
          <div className="summary-card">
            <p className="summary-title">총 근로자 수</p>
            <p className="summary-value">{statisticsData.cards?.workers || 0}명</p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>안전모 착용률 추이</h3>
        <Line data={lineData} />
      </div>

      <div className="chart-section">
        <h3>평균 시간대별 미착용 감지 분포</h3>
        <Bar data={barData} />
      </div>

      <div className="pdf-download">
        <button className="pdf-btn" onClick={handleDownloadPDF}>
          {`${year}년 ${viewMode === "month" ? month + "월 " : ""}통계 PDF로 내보내기`}
        </button>
      </div>
    </div>
  );
}

export default Statistics