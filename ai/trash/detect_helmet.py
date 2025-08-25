from ultralytics import YOLO
import os
from PIL import Image

# 1. 모델 로드
model = YOLO("best.pt")

# 2. 이미지 폴더 경로 설정
image_dir = "C:/Users/soung/OneDrive/바탕 화면/sample/images2"
image_list = [os.path.join(image_dir, f) for f in os.listdir(image_dir) if f.lower().endswith((".jpg", ".jpeg", ".png"))]

# 3. 결과 저장 경로 설정
result_file_path = os.path.join(image_dir, "helmet_score_result.txt")
output_image_dir = os.path.join(image_dir, "predicted")  # 예측 이미지 저장 폴더

# 예측 이미지 폴더 생성   
os.makedirs(output_image_dir, exist_ok=True)

# 4. 결과 기록 시작
with open(result_file_path, "w", encoding="utf-8") as result_file:
    for image_path in image_list:
        results = model.predict(source=image_path, conf=0.5, save=False, save_txt=False, save_crop=False)

        # 클래스 ID 추출
        class_ids = results[0].boxes.cls.cpu().numpy().astype(int)
        num_helmets = (class_ids == 0).sum()   # hat
        num_nohelmets = (class_ids == 1).sum() # person(= no helmet)

        # 총 탐지 인원
        num_total = num_helmets + num_nohelmets

        # 착용률 계산
        wearing_rate = (num_helmets / num_total * 100) if num_total > 0 else 0.0

        # 파일명
        filename = os.path.basename(image_path)

        # 💡 예측 이미지 저장
        plotted = results[0].plot()  # 결과 이미지 얻기 (NumPy 배열)
        output_path = os.path.join(output_image_dir, filename)
        Image.fromarray(plotted).save(output_path)

        # 로그 출력 및 저장
        result_file.write(
            f"{filename}:\n"
            f"  탐지 인원 = {num_total}\n"
            f"  헬멧 착용 인원 = {num_helmets}\n"
            f"  착용률 = {wearing_rate:.2f}%\n"
            f"  결과 이미지 = {output_path}\n\n"
        )

        print(
            f"{filename} | 탐지 인원={num_total}, "
            f"헬멧 착용 인원={num_helmets}, "
            f"착용률={wearing_rate:.2f}%, "
            f"결과 이미지={output_path}"
        )

print(f"\n✅ 결과 저장 완료: {os.path.abspath(result_file_path)}")
print(f"🖼️ 예측 이미지 저장 경로: {os.path.abspath(output_image_dir)}")
