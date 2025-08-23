from datetime import datetime, timedelta
import calendar

# ✅ 시간대 정의 (8개)
TIME_RANGES = [
    "07:00 ~ 08:00",
    "08:00 ~ 09:00",
    "09:00 ~ 10:00",
    "10:00 ~ 11:30",  # 점심 전까지 합침
    "13:00 ~ 14:00",
    "14:00 ~ 15:00",
    "15:00 ~ 16:00",
    "16:00 ~ 17:00",
]

def get_week_range(date_str):
    d = datetime.strptime(date_str, "%Y-%m-%d")
    start = d - timedelta(days=d.weekday())
    end = start + timedelta(days=6)
    return start.date(), end.date()

def get_month_range(date_str):
    d = datetime.strptime(date_str, "%Y-%m-%d")
    start = datetime(d.year, d.month, 1).date()
    last_day = calendar.monthrange(d.year, d.month)[1]
    end = datetime(d.year, d.month, last_day).date()
    return start, end

def get_grade(avg_rate):
    if avg_rate >= 95: return "A"
    elif avg_rate >= 90: return "B+"
    elif avg_rate >= 80: return "B"
    elif avg_rate >= 70: return "C"
    else: return "D"
