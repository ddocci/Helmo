import React, { useState } from "react";
import "../../css/Edit/ImageUploadGrid.css";

const times = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"];

const ImageUploadGrid = () => {
  const [images, setImages] = useState(Array(8).fill(null));

  const handleUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);

      // TODO: 백엔드 API 연결해서 DB 저장 + AI 분석 요청
    }
  };

  return (
    <div className="ImageUploadGrid">
      <h3>시간별 이미지 업로드</h3>
      <div className="Grid">
        {times.map((time, idx) => (
          <div key={idx} className="ImageBox">
            <p>{time}</p>
            {images[idx] ? (
              <img src={images[idx]} alt="업로드 이미지" />
            ) : (
              <label className="UploadLabel">
                이미지 없음
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
    </div>
  );
};

export default ImageUploadGrid;
