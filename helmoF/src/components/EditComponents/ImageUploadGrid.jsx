import React, { useState, useCallback, useMemo } from "react";
import "../../css/Edit/ImageUploadGrid.css";

// 📌 근무 시간대 (8개)
const times = [
  "07:00 ~ 08:00",
  "08:00 ~ 09:00",
  "09:00 ~ 10:00",
  "10:00 ~ 11:30", // 점심 전까지
  "13:00 ~ 14:00",
  "14:00 ~ 15:00",
  "15:00 ~ 16:00",
  "16:00 ~ 17:00",
];

const ImageUploadGrid = ({ onAnalyzeComplete }) => {
  const [images, setImages] = useState(Array(times.length).fill(null));
  const [memo, setMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ✅ 업로드 처리
  const handleUpload = useCallback((index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  }, []);

  // ✅ 저장 버튼 → 업로드 + 분석
  const handleSave = useCallback(async () => {
    const formData = new FormData();

    images.forEach((file, idx) => {
      if (file instanceof File) {
        formData.append("files", file);
        formData.append("time_slots", idx + 1);
      }
    });

    formData.append("memo", memo);
    formData.append("date", selectedDate);

    try {
      // 1) 업로드
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("업로드 실패");
      await res.json();

      // 2) 분석
      const analyzeRes = await fetch(
        `http://localhost:8000/analyze?date=${selectedDate}`
      );
      if (!analyzeRes.ok) throw new Error("분석 API 실패");
      const analyzeData = await analyzeRes.json();

      console.log("📊 분석 결과:", analyzeData);
      if (onAnalyzeComplete) onAnalyzeComplete(analyzeData);

      alert("업로드 및 분석 완료!");
    } catch (err) {
      console.error("❌ 오류:", err);
      alert("업로드/분석 중 오류 발생");
    }
  }, [images, memo, selectedDate, onAnalyzeComplete]);

  const fileCount = useMemo(() => images.filter(Boolean).length, [images]);

  return (
    <div className="ImageUploadGrid">
      <h3 className="GridTitle">시간대별 이미지 관리</h3>

      {/* 📌 날짜 선택 */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <div className="Grid">
        {times.map((time, idx) => (
          <div key={idx} className="ImageBox">
            <div className="TimeTag">{time}</div>
            {images[idx] ? (
              <img
                src={URL.createObjectURL(images[idx])}
                alt={`업로드 ${time}`}
                className="PreviewImage"
              />
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
        ))}
      </div>

      <p className="FileCount">총 {fileCount}개 이미지 파일이 선택되었습니다.</p>
      <textarea
        className="MemoInput"
        placeholder="메모를 입력하세요..."
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button className="SaveBtn" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
};

export default ImageUploadGrid;
