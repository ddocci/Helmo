import React from "react";
import DailyResultRow from "./DailyResultRow";
import "../../css/DailyResult/DailyResultTable.css";

const DailyResultTable = ({ results, onDelete }) => {
  return (
    <table className="daily-result-table">
      <thead>
        <tr>
          <th>시간대</th>
          <th>탐지 인원</th>
          <th>안전모 착용 인원</th>
          <th>착용률 (%)</th>
          <th>결과 이미지</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {results.map((row) => (
          <DailyResultRow key={row.hourly_id} result={row} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default DailyResultTable;
