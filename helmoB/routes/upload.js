const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db2"); // DB 연결

const router = express.Router();

// ✅ multer 저장 경로/이름 지정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 프로젝트 루트에 uploads 폴더
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ 이미지 업로드 API
router.post("/upload-images", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;
    const memo = req.body.memo || "";

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "이미지가 없습니다." });
    }

    // DB에 저장 (img_path = 로컬 경로)
    const promises = files.map((file) => {
      const localPath = `uploads/${file.filename}`; // ✅ 로컬 경로
      return db.query(
        "INSERT INTO site_image (img_date, img_path, memo) VALUES (?, ?, ?)",
        [new Date(), localPath, memo]
      );
    });

    await Promise.all(promises);

    // 응답에는 클라이언트 접근 가능한 URL도 함께 내려주기
    const fileInfos = files.map((file) => ({
      filename: file.filename,
      localPath: `uploads/${file.filename}`, // DB 저장용
      url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`, // 클라이언트 표시용
    }));

    res.json({ message: "이미지 + 메모 업로드 성공", files: fileInfos, memo });
  } catch (err) {
    console.error("❌ 업로드 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
