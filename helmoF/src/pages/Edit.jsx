import React, { useState } from "react";
import Header from "../components/Header";
import DateScoreBox from "../components/EditComponents/DateScoreBox";
import ImageUploadGrid from "../components/EditComponents/ImageUploadGrid";
import ScoreSummary from "../components/EditComponents/ScoreSummary";
import DailyResult from "./DailyResult";   // ✅ 결과 표시 컴포넌트

import "../css/Edit/EditPage.css";

const Edit = () => {
  const [results, setResults] = useState(null); // AI 분석 결과 상태 저장

  return (
    <div>
          <Header />
      <div className="EditPage">

        {/* 날짜 + 점수 */}
        <DateScoreBox />

        {/* 이미지 업로드 + 저장 → 분석 결과 */}
        <ImageUploadGrid onAnalyzeComplete={setResults} />

      </div>
    </div>
  );
};

export default Edit;
