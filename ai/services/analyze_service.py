import os
from ultralytics import YOLO
from PIL import Image
from config.db import get_db_connection
from helper import TIME_RANGES

model = YOLO("best.pt")

def analyze(date: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT img_path, time_slot FROM site_image WHERE img_date=%s", (date,))
    images = cursor.fetchall()
    if not images:
        return {"message": f"{date} 이미지 없음"}

    output_dir = f"./result/{date}"
    os.makedirs(output_dir, exist_ok=True)

    total_detected, total_wearing = 0, 0

    for row in images:
        img_path = row["img_path"]
        slot = row["time_slot"]  # 📌 업로드 시 전달한 시간대 index

        pred = model.predict(source=img_path, conf=0.5, save=False)
        class_ids = pred[0].boxes.cls.cpu().numpy().astype(int)

        helmets = int((class_ids == 0).sum())
        total = int(len(class_ids))
        wearing_rate = (helmets / total * 100) if total > 0 else 0.0

        filename = os.path.basename(img_path)
        out_file = os.path.join(output_dir, f"pred_{filename}")
        Image.fromarray(pred[0].plot()).save(out_file)

        cursor2 = conn.cursor()
        cursor2.execute("""
            INSERT INTO hourly_score 
            (score_date, hour_slot, hour_range, detected_count, wearing_count, wearing_rate, img_filename)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                detected_count=VALUES(detected_count),
                wearing_count=VALUES(wearing_count),
                wearing_rate=VALUES(wearing_rate),
                img_filename=VALUES(img_filename),
                hour_range=VALUES(hour_range),
                created_at=CURRENT_TIMESTAMP
        """, (date, slot, TIME_RANGES[slot-1], total, helmets, round(wearing_rate, 2), filename))
        cursor2.close()

        total_detected += total
        total_wearing += helmets

    if total_detected > 0:
        final_rate = round((total_wearing / total_detected) * 100, 2)
        cursor3 = conn.cursor()
        cursor3.execute("""
            INSERT INTO daily_score (score_date, detected_count, wearing_count, wearing_rate)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                detected_count=VALUES(detected_count),
                wearing_count=VALUES(wearing_count),
                wearing_rate=VALUES(wearing_rate),
                created_at=CURRENT_TIMESTAMP
        """, (date, total_detected, total_wearing, final_rate))
        cursor3.close()

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": f"{date} 분석 완료 및 DB 저장"}
