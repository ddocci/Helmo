import React from "react";
import Header from "../components/Header";
import DateScoreBox from "../components/EditComponents/DateScoreBox";
import ImageUploadGrid from "../components/EditComponents/ImageUploadGrid";
// import MemoBox from "../components/EditComponents/MemoBox";
import ScoreSummary from "../components/EditComponents/ScoreSummary";

import "../css/Edit/EditPage.css";

const Edit = () => {
  return (
    <div className="EditPage">
      <Header />
      {/* 날짜 + 점수 */}
      <DateScoreBox />

      <ImageUploadGrid />
      {/* 보라 박스 : 점수 요약 */}
      <ScoreSummary />
    </div>
  );
};

export default Edit;
