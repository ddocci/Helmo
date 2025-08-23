import "../../css/DailyResult/DailyResultRow.css";

const DailyResultRow = ({ result, onDelete }) => {
  return (
    <tr>
      <td>{result.timeRange}</td>
      <td>{result.detected_count}</td>
      <td>{result.wearing_count}</td>
      <td>{result.wearing_rate}%</td>
      <td>
        {result.result_image ? (
          <img
            src={result.result_image}
            alt="결과"
            className="result-image"
            onClick={() => window.open(result.result_image, "_blank")}
          />
        ) : (
          "없음"
        )}
      </td>
      <td>
        <button
          onClick={() => onDelete(result.hourly_id)}
          className="delete-button"
        >
          삭제
        </button>
      </td>
    </tr>
  );
};

export default DailyResultRow;
