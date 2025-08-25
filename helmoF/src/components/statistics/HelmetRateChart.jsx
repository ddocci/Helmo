// src/components/statistics/HelmetRateChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const HelmetRateChart = ({ labels, rates }) => {
  // 요일 변환 매핑
  const weekMap = ["일", "월", "화", "수", "목", "금", "토"];

  // 📌 labels가 날짜일 경우 → 요일로 변환
  const parsedLabels = labels.map((label, idx) => {
    try {
      const d = new Date(label);
      if (!isNaN(d.getTime())) {
        return weekMap[d.getDay()];
      }
    } catch (e) {}
    return label; // 날짜 변환 실패하면 원래 값
  });

  const data = {
    labels: parsedLabels,
    datasets: [
      {
        label: "착용률(%)",
        data: rates,
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 10 },
      },
    },
  };

  return (
    <div className="helmet-rate-chart">
      <h3>안전모 착용률 추이</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default HelmetRateChart;
