import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AnalysisHeader from "../components/statistics/AnalysisHeader";
import PeriodNavigation from "../components/statistics/PeriodNavigation";
import SummaryCards from "../components/statistics/SummaryCards";
import HelmetRateChart from "../components/statistics/HelmetRateChart";
import "../css/Statistics/Statistics.css";
import { getWeekRange, getMonthRange } from "../utils/dateUtils";

// 📌 월 단위 주차 생성 (7일 단위)
function generateWeekOptions(year, startMonth = 1, endMonth = 12) {
  const options = [];

  for (let month = startMonth; month <= endMonth; month++) {
    const lastDay = new Date(year, month, 0).getDate();
    let week = 1;

    for (let day = 1; day <= lastDay; day += 7) {
      options.push({
        value: `${year}-${month}-${week}`,
        label: `${year}년 ${month}월 ${week}주차`,
        date: new Date(year, month - 1, day),
      });
      week++;
    }
  }
  return options;
}

// 📌 오늘이 몇 주차인지 구하기
function getCurrentWeekOption(options, today = new Date()) {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const monthOptions = options.filter((opt) =>
    opt.value.startsWith(`${year}-${month}-`)
  );

  const weekIndex = Math.ceil(day / 7) - 1;
  return monthOptions[weekIndex] || monthOptions[0];
}

// 📌 등급 계산
function getGrade(avgRate) {
  if (avgRate >= 95) return "A";
  if (avgRate >= 90) return "B";
  if (avgRate >= 80) return "C";
  return "D";
}

const Statistics = () => {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [summary, setSummary] = useState({
    avgRate: 0,
    totalDetections: 0,
    totalWearing: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [header, setHeader] = useState("");

  // 📌 주차 옵션 생성 (예시: 2025년 전체)
  const periodOptions = generateWeekOptions(2025, 1, 12);

  // 📌 처음 로딩 시 현재 주차로 기본값 세팅
  useEffect(() => {
    const todayOption = getCurrentWeekOption(periodOptions, new Date());
    if (todayOption) {
      setHeader(todayOption.label);
      setCurrentDate(todayOption.date);
    }
  }, []);

  // 📌 날짜/기간이 바뀔 때마다 헤더와 데이터 갱신
  useEffect(() => {
    if (!currentDate) return;

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
        `/api/statistics/${mode}?startDate=${start
          .toISOString()
          .split("T")[0]}&endDate=${end.toISOString().split("T")[0]}`
      );
      const data = await res.json();

      setSummary({
        avgRate: data.summary.avgRate,
        totalDetections: data.summary.totalDetections,
        totalWearing: data.summary.totalWearing,
      });

      if (mode === "week") {
        // 📌 주간 데이터: 요일 배열로 매핑
        const weekRates = Array(7).fill(null); // 월~일 자리 마련
        data.chart.forEach((d) => {
          const date = new Date(d.date);
          const day = (date.getDay() + 6) % 7; 
          // getDay()는 일=0~토=6 → 월=0, 화=1 ... 일=6 으로 변환
          weekRates[day] = d.rate;
        });
        setChartData(weekRates);
      } else {
        // 📌 월간 데이터: 그대로 날짜별
        setChartData(data.chart); // [{date:"2025-08-01", rate:92}, ...]
      }
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    }
  };

  // 📌 이전 주차/월로 이동
  const handlePrev = () => {
    if (viewMode === "week") {
      const prev = new Date(currentDate);
      prev.setDate(prev.getDate() - 7);
      setCurrentDate(prev);
    } else {
      const prev = new Date(currentDate);
      prev.setMonth(prev.getMonth() - 1);
      setCurrentDate(prev);
    }
  };

  // 📌 다음 주차/월로 이동
  const handleNext = () => {
    if (viewMode === "week") {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 7);
      setCurrentDate(next);
    } else {
      const next = new Date(currentDate);
      next.setMonth(next.getMonth() + 1);
      setCurrentDate(next);
    }
  };

  // 📌 드롭다운 선택 시 동작
  const handlePeriodChange = (value) => {
    if (viewMode === "week") {
      const selected = periodOptions.find((o) => o.value === value);
      if (selected) {
        setHeader(selected.label);
        setCurrentDate(selected.date);
      }
    } else {
      const year = new Date().getFullYear();
      const selectedDate = new Date(year, value - 1, 1);
      setHeader(`${year}년 ${value}월`);
      setCurrentDate(selectedDate);
    }
  };
  // 📌 현재 선택된 값 계산
  const selectedValue =
    viewMode === "week"
      ? (() => {
          const found = periodOptions.find(
            (o) =>
              o.date.getFullYear() === currentDate.getFullYear() &&
              o.date.getMonth() === currentDate.getMonth() &&
              Math.ceil(currentDate.getDate() / 7) ===
                parseInt(o.value.split("-")[2], 10)
          );
          return found ? found.value : "";
        })()
      : currentDate.getMonth() + 1; // 월 모드일 때는 달 번호

  return (
    <div className="statistics-page">
      <Header />
      <AnalysisHeader viewMode={viewMode} setViewMode={setViewMode} />
      <PeriodNavigation
        header={header}
        onPrev={handlePrev}
        onNext={handleNext}
        onPeriodChange={handlePeriodChange}
        options={periodOptions}
        viewMode={viewMode}
        selectedValue={selectedValue} // ✅ 현재 선택된 값 넘김
      />
      <SummaryCards
        avgRate={summary.avgRate}
        totalDetections={summary.totalDetections}
        totalWearing={summary.totalWearing}
        grade={getGrade(summary.avgRate)} // ✅ 클라이언트에서 계산
      />
      <HelmetRateChart
        labels={
          viewMode === "week"
            ? ["월", "화", "수", "목", "금", "토", "일"]   // ✅ 주간은 고정 라벨
            : chartData
                .filter((d) => d)                         // ✅ null 방지
                .map((d) => new Date(d.date).getDate() + "일")
        }
        rates={
          viewMode === "week"
            ? chartData                                   // ✅ 숫자 배열
            : chartData.filter((d) => d).map((d) => d.rate)
        }
      />
    </div>
  );
};

export default Statistics;
