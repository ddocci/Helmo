from config.db import get_db_connection
from helper import get_week_range, get_month_range, get_grade

def get_result(date: str):
    safe_date = str(date).split("T")[0]
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # ✅ Daily
    cursor.execute("SELECT * FROM daily_score WHERE score_date=%s", (safe_date,))
    daily = cursor.fetchone()

    # ✅ Hourly (시간대 직접 저장된 값 활용)
    cursor.execute("SELECT * FROM hourly_score WHERE score_date=%s ORDER BY hour_slot ASC", (safe_date,))
    hourly = cursor.fetchall()

    # ✅ Weekly
    week_start, week_end = get_week_range(safe_date)
    cursor.execute("""
        SELECT AVG(wearing_rate) AS avg_rate
        FROM daily_score
        WHERE score_date BETWEEN %s AND %s
    """, (week_start, week_end))
    row = cursor.fetchone()
    weekly = {"avg_rate": None, "grade": None}
    if row and row["avg_rate"] is not None:
        weekly["avg_rate"] = round(row["avg_rate"], 2)
        weekly["grade"] = get_grade(weekly["avg_rate"])

    # ✅ Monthly
    month_start, month_end = get_month_range(safe_date)
    cursor.execute("""
        SELECT AVG(wearing_rate) AS avg_rate
        FROM daily_score
        WHERE score_date BETWEEN %s AND %s
    """, (month_start, month_end))
    row = cursor.fetchone()
    monthly = {"avg_rate": None, "grade": None}
    if row and row["avg_rate"] is not None:
        monthly["avg_rate"] = round(row["avg_rate"], 2)
        monthly["grade"] = get_grade(monthly["avg_rate"])

    cursor.close()
    conn.close()

    # ✅ 이미지 URL 붙이기
    for row in hourly:
        row["result_image"] = f"http://localhost:8000/result/{safe_date}/pred_{row['img_filename']}"

    return {"daily": daily, "detailed": hourly, "weekly": weekly, "monthly": monthly}
