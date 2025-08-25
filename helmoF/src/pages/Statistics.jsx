// src/pages/Statistics.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AnalysisHeader from "../components/statistics/AnalysisHeader";
import PeriodNavigation from "../components/statistics/PeriodNavigation";
import SummaryCards from "../components/statistics/SummaryCards";
import HelmetRateChart from "../components/statistics/HelmetRateChart";
import '../css/Statistics/Statistics.css';
import { getWeekRange, getMonthRange } from "../utils/dateUtils";

const Statistics = () => {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [summary, setSummary] = useState({ avgRate: 0, totalDetections: 0, totalWearing: 0 });
  const [chartData, setChartData] = useState([]);
  const [header, setHeader] = useState("");

  // 📌 날짜/기간이 바뀔 때마다 헤더와 데이터 갱신
  useEffect(() => {
    if (viewMode === "week") {
      const { start, end, label } = getWeekRange(currentDate);
      setHeader(label);
      fetchData("week", start, end);
    } else {
      const { start, end, label } = getMonthRange(currentDate);
      setHeader(label);
      fetchData("month", start, end);
    }
  }, [currentDate, viewMode]);

  // 📌 DB 데이터 가져오기
  const fetchData = async (mode, start, end) => {
    try {
      const res = await fetch(
        `/api/statistics/${mode}?startDate=${start.toISOString().split("T")[0]}&endDate=${end.toISOString().split("T")[0]}`
      );
      const data = await res.json();

      setSummary(data.summary);
      setChartData(data.chart);
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  };

  // 📌 이전/다음 버튼 동작
  const handlePrev = () => {
    if (viewMode === "week") {
      const prev = new Date(currentDate.getTime()); // 새 Date 객체 복사
      prev.setDate(prev.getDate() - 7);             // 1주일 전
      setCurrentDate(prev);
    } else {
      const prev = new Date(currentDate.getTime());
      prev.setMonth(prev.getMonth() - 1);           // 1개월 전
      setCurrentDate(prev);
    }
  };

  const handleNext = () => {
    if (viewMode === "week") {
      const next = new Date(currentDate.getTime());
      next.setDate(next.getDate() + 7);             // 1주일 후
      setCurrentDate(next);
    } else {
      const next = new Date(currentDate.getTime());
      next.setMonth(next.getMonth() + 1);           // 1개월 후
      setCurrentDate(next);
    }
  };

  return (
    <div className="statistics-page">
      <Header />
      <AnalysisHeader viewMode={viewMode} setViewMode={setViewMode} />
      <PeriodNavigation header={header} onPrev={handlePrev} onNext={handleNext} />
      <SummaryCards
        avgRate={summary.avgRate}
        totalDetections={summary.totalDetections}
        totalWearing={summary.totalWearing}
      />
      <HelmetRateChart
        labels={chartData.map((d) => d.date)}
        rates={chartData.map((d) => d.rate)}
      />
    </div>
  );
};

export default Statistics;
