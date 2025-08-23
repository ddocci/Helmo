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
  const weeklyData = {
    cards: { helmetRate: 93.5, incidents: 12, workers: 500 },
    line: [91.1, 93.3, 94.5, 92.2, 93.8, 94.0, 95.2], // 7일 간
    bar: [3, 2, 2, 1],
    pie: [95.1, 94.3, 93.5, 92.8],
  };


  useEffect(() => {
    setStatisticsData(viewMode === "month" ? monthlyData : weeklyData);
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

  // 주차 계산 (1월 1일부터 시작한 주차 기준)
    const getWeekOfMonth = (date) => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const dayOfWeek = firstDay.getDay() || 7; // 일요일 = 7
      const adjustedDate = date.getDate() + dayOfWeek - 1;
      return Math.ceil(adjustedDate / 7);
    };

    const [currentDate, setCurrentDate] = useState(
      location.state?.date ? new Date(location.state.date) : new Date()
    );
    // const [year, setYear] = useState(currentDate.getFullYear());
    // const [month, setMonth] = useState(currentDate.getMonth() + 1);

    const getFormattedHeader = () => {
      if (viewMode === "week") {
        const week = getWeekOfMonth(currentDate);
        return `${year}년 ${month}월 ${week}주차`;
      } else {
        return `${year}년 ${month}월`;
      }
    };

    const handlePrev = () => {
      if (viewMode === "week") {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
        setYear(prevWeek.getFullYear());
        setMonth(prevWeek.getMonth() + 1);
      } else {
        if (month === 1) {
          setYear(year - 1);
          setMonth(12);
        } else {
          setMonth(month - 1);
        }
      }
    };

    const handleNext = () => {
      if (viewMode === "week") {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
        setYear(nextWeek.getFullYear());
        setMonth(nextWeek.getMonth() + 1);
      } else {
        if (month === 12) {
          setYear(year + 1);
          setMonth(1);
        } else {
          setMonth(month + 1);
        }
      }
    };


  // 현재 월의 마지막 일 구하기
const getLastDayOfMonth = (y, m) => new Date(y, m, 0).getDate(); // m은 1~12

const dayNames = ["월", "화", "수", "목", "금", "토", "일"];

const getLineChartLabels = () => {
  if (viewMode === "week") return dayNames;
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
};


// 라벨 & 데이터
const lineLabels =
  viewMode === "month"
    ? Array.from({ length: getLastDayOfMonth(year, month) }, (_, i) => `${i + 1}일`)
    : ["월", "화", "수", "목", "금", "토", "일"];

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
    labels: ["09시", "10시", "11시", "14시", "15시", "16시", "17시", "18시"],
    datasets: [
      {
        label: "미착용 인원수",
        data: [3, 2, 4, 2, 3, 1, 2, 1], // 👉 여기는 더미 데이터, 실제 DB와 연결 가능
        backgroundColor: "#6c8cf7",
      },
    ],
  };


  const barOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "시간대",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "미착용 인원수",
          },
        },
      },
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
          {/* 왼쪽: 주별 / 월별 버튼 */}
          <div className="statistics-tabbar">
            <div
              className={`tab-button ${viewMode === "week" ? "active" : ""}`}
              onClick={() => setViewMode("week")}
            >
              주별 보기
            </div>
            <div
              className={`tab-button ${viewMode === "month" ? "active" : ""}`}
              onClick={() => setViewMode("month")}
            >
              월별 보기
            </div>
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
            <button className="nav-btn" onClick={handlePrev}>◀</button>
            <h4 className="summary-year">{`< ${getFormattedHeader()} >`}</h4>
            <button className="nav-btn" onClick={handleNext}>▶</button>
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
        <Bar data={barData} options={barOptions} />
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