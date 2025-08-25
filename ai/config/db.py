import mysql.connector
import os
from dotenv import load_dotenv

# 현재 파일(db.py) 기준으로 .env 경로 찾기
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # ai/
ENV_PATH = os.path.join(BASE_DIR, ".env")

# .env 불러오기
load_dotenv(dotenv_path=ENV_PATH)

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT")),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
