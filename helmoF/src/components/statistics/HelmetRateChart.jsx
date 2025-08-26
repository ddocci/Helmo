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
  Filler,   // ✅ fill 옵션용
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const HelmetRateChart = ({ labels, rates }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "착용률(%)",
        data: rates,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true, // ✅ Filler 플러그인 활성화됨
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
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
