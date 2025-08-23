import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header"; 
import DailyResultTable from "../components/DailyResult/DailyResultTable";
import "../css/DailyResult/DailyResult.css";

const DailyResult = () => {
  const { date } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 hour_slot → 실제 시간대 매핑 (8구간)
  const timeRanges = [
    "07:00 ~ 08:00",
    "08:00 ~ 09:00",
    "09:00 ~ 10:00",
    "10:00 ~ 11:30", // 점심 전까지
    "13:00 ~ 14:00",
    "14:00 ~ 15:00",
    "15:00 ~ 16:00",
    "16:00 ~ 17:00",
  ];

  const formatApiDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const apiDate = formatApiDate(date);
        const res = await fetch(`http://localhost:8000/result?date=${apiDate}`);
        if (!res.ok) throw new Error("DB 결과 조회 실패");
        const data = await res.json();

        // 📌 시간대 매핑해서 변환
        const mapped = (data.detailed || []).map((r) => ({
          ...r,
          timeRange: timeRanges[r.hour_slot - 1] || `${r.hour_slot}시간대`
        }));

        setResults(mapped);
      } catch (err) {
        console.error("❌ 결과 조회 오류:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (date) fetchResults();
  }, [date]);

  const handleDelete = async (hourlyId) => {
    if (!hourlyId) {
      alert("❌ hourly_id가 전달되지 않았습니다.");
      return;
    }
    if (!window.confirm("⚠️ 삭제 후 되돌릴 수 없습니다. 정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`http://localhost:8000/delete_hourly/${hourlyId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
      alert("✅ 삭제 완료되었습니다.");
      setResults(results.filter((r) => r.hourly_id !== hourlyId));
    } catch (err) {
      console.error("❌ 삭제 오류:", err);
      alert("❌ 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="daily-result-container">
      <Header />
      <h2>📊 {date} 분석 결과</h2>
      {loading ? (
        <p className="loading-text">⏳ Loading~</p>
      ) : results.length === 0 ? (
        <p className="no-result-text">결과 없음</p>
      ) : (
        <DailyResultTable results={results} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default DailyResult;
