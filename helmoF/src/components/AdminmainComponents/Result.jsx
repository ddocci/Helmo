import React, { useEffect, useState } from "react";
import "../../css/Adminmain/Result.css";

const Result = ({ title, date, mode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 날짜 포맷
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (mode === "daily") {
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    } else if (mode === "weekly") {
      const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
      const weekNumber = Math.ceil((d.getDate() + firstDay.getDay()) / 7);
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${weekNumber}째주`;
    } else if (mode === "monthly") {
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
    }
    return "-";
  };

  useEffect(() => {
    if (!date) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const d = new Date(date);
        const apiDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;

        const res = await fetch(`http://localhost:8000/result?date=${apiDate}`);
        if (!res.ok) throw new Error("데이터 불러오기 실패");
        const result = await res.json();

        if (mode === "daily" && result.daily) {
          setData(result.daily);
        } else if (mode === "weekly" && result.weekly) {
          setData(result.weekly);
        } else if (mode === "monthly" && result.monthly) {
          setData(result.monthly);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("❌ 결과 불러오기 오류:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, mode]);

  return (
    <div className="ResultCard">
      <h3>{title}</h3>
      <p className="ResultDate">{formatDate(date)}</p>

      <div className="ResultContent">
        {loading ? (
          <p>⏳ 불러오는 중...</p>
        ) : data ? (
          <>
            {mode === "daily" ? (
              <>
                <div className="ResultRow">
                  <span>탐지 인원</span>
                  <span className="ResultValue">{data.detected_count}</span>
                </div>
                <div className="ResultRow">
                  <span>안전모 착용 인원</span>
                  <span className="ResultValue">{data.wearing_count}</span>
                </div>
                <div className="ResultRow">
                  <span>착용률</span>
                  <span className="ResultValue">{data.wearing_rate}%</span>
                </div>
              </>
            ) : mode === "weekly" ? (
              <>
                <div className="ResultRow">
                  <span>등급</span>
                  <span className="ResultBadge">{data.grade || "-"}</span>
                </div>
                <div className="ResultRow">
                  <span>평균 착용률</span>
                  <span className="ResultValue">
                    {data.avg_rate !== null ? `${data.avg_rate}%` : "-"}
                  </span>
                </div>
              </>
            ) : (
              // ✅ 월간 모드
              <>
                <div className="ResultRow">
                  <span>등급</span>
                  <span className="ResultBadge">{data.grade || "-"}</span>
                </div>
                <div className="ResultRow">
                  <span>월 평균 착용률</span>
                  <span className="ResultValue">
                    {data.avg_rate !== null ? `${data.avg_rate}%` : "-"}
                  </span>
                </div>
              </>
            )}
          </>
        ) : (
          <p>결과 없음</p>
        )}
      </div>
    </div>
  );
};

export default Result;
