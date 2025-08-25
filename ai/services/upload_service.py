# 업로드 관련 로직
import os
from fastapi import UploadFile, Form, File, HTTPException
from config.db import get_db_connection

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def upload_image(file: UploadFile = File(...), date: str = Form(...)):
    try:
        filename = f"{file.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)

        with open(filepath, "wb") as buffer:
            buffer.write(await file.read())

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO site_image (img_path, img_date, memo) VALUES (%s, %s, %s)",
            (filename, date, memo)   # ✅ memo 함께 저장
        )
        conn.commit()
        cursor.close()
        conn.close()

        return {"message": "업로드 성공", "file": filename, "date": date, "memo": memo}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
