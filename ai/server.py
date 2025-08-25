from fastapi import FastAPI, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os, time

from services.analyze_service import analyze
from services.result_service import get_result
from services.delete_service import delete_hourly
from config.db import get_db_connection

app = FastAPI()

# ✅ CORS 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 정적 파일 서빙
app.mount("/result", StaticFiles(directory="result"), name="result")

# ✅ 업로드 디렉토리 (절대경로)
UPLOAD_DIR = os.path.abspath("uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ✅ 업로드 API (파일 여러 개 + 시간대 index 저장)
@app.post("/upload")
async def upload_images(
    files: List[UploadFile] = File(...),
    time_slots: List[int] = Form(...),
    date: str = Form(...)
):
    if len(files) != len(time_slots):
        return {"error": "파일 개수와 시간대 개수가 일치하지 않습니다."}

    conn = get_db_connection()
    cursor = conn.cursor()

    uploaded_files = []

    for file, slot in zip(files, time_slots):
        # 안전한 파일명 생성
        timestamp = int(time.time() * 1000)
        safe_name = os.path.basename(file.filename).replace(" ", "_")
        filename = f"{timestamp}-{safe_name}"
        filepath = os.path.join(UPLOAD_DIR, filename)  # ✅ 절대경로

        # 파일 저장
        with open(filepath, "wb") as buffer:
            buffer.write(await file.read())

        # DB 저장 (절대경로 저장)
        cursor.execute(
            "INSERT INTO site_image (img_path, img_date, time_slot) VALUES (%s, %s, %s)",
            (filepath, date, slot)
        )

        uploaded_files.append({"filename": filename, "slot": slot})

    conn.commit()
    cursor.close()
    conn.close()

    return {
        "message": "업로드 성공",
        "date": date,
        "files": uploaded_files
    }


# ✅ 분석 API
@app.get("/analyze")
def analyze_endpoint(date: str):
    return analyze(date)


# ✅ 결과 조회 API
@app.get("/result")
def result_endpoint(date: str):
    return get_result(date)


# ✅ 삭제 API
@app.delete("/delete_hourly/{hourly_id}")
def delete_hourly_endpoint(hourly_id: int):
    return delete_hourly(hourly_id)
