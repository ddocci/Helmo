import React from "react";
import Header from "../components/Header";
import DateScoreBox from "../components/EditComponents/DateScoreBox";
import ImageUploadGrid from "../components/EditComponents/ImageUploadGrid";
import MemoBox from "../components/EditComponents/MemoBox";
import ScoreSummary from "../components/EditComponents/ScoreSummary";

import "../css/Edit/EditPage.css";

const Edit = () => {
  return (
    <div className="EditPage">
      {/* 빨간 박스 : Header */}
      <Header />

      {/* 주황 박스 : 날짜 + 점수 */}
      <DateScoreBox />

      {/* 노란 박스 : 이미지 업로드 */}
      <ImageUploadGrid />

      {/* 파란 박스 : 메모 입력 */}
      <MemoBox />

      {/* 보라 박스 : 점수 요약 */}
      <ScoreSummary />
    </div>
  );
};

export default Edit;
