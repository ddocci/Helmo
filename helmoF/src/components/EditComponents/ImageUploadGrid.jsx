import React, { useState, useCallback, useMemo } from "react";
import "../../css/Edit/ImageUploadGrid.css";

const times = ["1시간", "2시간", "3시간", "4시간", "5시간", "6시간", "7시간", "8시간"];

const ImageUploadGrid = () => {
  const [images, setImages] = useState(Array(8).fill(null));
  const [memo, setMemo] = useState("");

  // ✅ 업로드 처리
  const handleUpload = useCallback((index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = URL.createObjectURL(file);
      return newImages;
    });

    // TODO: 백엔드 API 연결 (파일 업로드)
  }, []);

  // ✅ 저장 버튼
  const handleSave = useCallback(() => {
    console.log("저장할 이미지:", images);
    console.log("저장할 메모:", memo);
    // TODO: API 연동
  }, [images, memo]);

  // ✅ 파일 개수 계산 최적화
  const fileCount = useMemo(() => images.filter(Boolean).length, [images]);

  // ✅ 이미지 업로드 UI
  const renderImageBox = (time, idx) => (
    <div key={idx} className="ImageBox">
      <div className="TimeTag">{time}</div>
      {images[idx] ? (
        <img src={images[idx]} alt={`업로드 ${time}`} className="PreviewImage" />
      ) : (
        <label className="UploadLabel">
          <span className="PlusSign">+</span>
          <p className="UploadText">이미지 추가</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(idx, e)}
            hidden
          />
        </label>
      )}
    </div>
  );

  return (
    <div className="ImageUploadGrid">
      <h3 className="GridTitle">타이머별 이미지 관리</h3>
      <div className="Grid">{times.map((time, idx) => renderImageBox(time, idx))}</div>

      {/* ✅ 파일 개수 */}
      <p className="FileCount">총 {fileCount}개 이미지 파일이 선택되었습니다.</p>

      {/* ✅ 메모 입력 칸 */}
      <textarea
        className="MemoInput"
        placeholder="메모를 입력하세요..."
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      {/* ✅ 저장 버튼 */}
      <button className="SaveBtn" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
};

export default ImageUploadGrid;
