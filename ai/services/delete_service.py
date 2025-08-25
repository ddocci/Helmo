from fastapi import HTTPException
from config.db import get_db_connection

def delete_hourly(hourly_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT score_date, img_filename FROM hourly_score WHERE hourly_id=%s", (hourly_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="데이터 없음")
        score_date, img_filename = row["score_date"], row["img_filename"]

        cursor.execute("DELETE FROM hourly_score WHERE hourly_id=%s", (hourly_id,))
        cursor.execute("DELETE FROM site_image WHERE img_path LIKE %s AND img_date=%s",
                       (f"%{img_filename}", score_date))

        cursor.execute("""
            SELECT SUM(detected_count) AS total_detected, SUM(wearing_count) AS total_wearing
            FROM hourly_score WHERE score_date=%s
        """, (score_date,))
        sums = cursor.fetchone()

        if sums and sums["total_detected"]:
            total_d, total_w = int(sums["total_detected"]), int(sums["total_wearing"])
            final_rate = round((total_w / total_d) * 100, 2)
            cursor.execute("""
                UPDATE daily_score
                SET detected_count=%s, wearing_count=%s, wearing_rate=%s, created_at=CURRENT_TIMESTAMP
                WHERE score_date=%s
            """, (total_d, total_w, final_rate, score_date))
        else:
            cursor.execute("DELETE FROM daily_score WHERE score_date=%s", (score_date,))

        conn.commit()
        return {"message": f"hourly_id {hourly_id} 삭제 완료"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
