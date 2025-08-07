// 더미 데이터 생성용 파일
const fs = require('fs');
const path = require('path');

const users = ['worker001', 'worker002'];
const manager = 'mgr001';
const weekdays = [];
const start = new Date('2025-07-01');
const end = new Date('2025-07-31');

for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
  const day = d.getDay();
  if (day >= 1 && day <= 5) {
    weekdays.push(new Date(d));
  }
}

const getRandomTime = (hour) => {
  const min = Math.floor(Math.random() * 60);
  const sec = Math.floor(Math.random() * 60);
  return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const scoreInserts = [];
const imageInserts = [];
const weeklyMap = {};
const monthlyMap = {};

weekdays.forEach(date => {
  const dateStr = date.toISOString().split('T')[0];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = Math.ceil((date.getDate() - 1 - date.getDay()) / 7) + 1;

  users.forEach(user => {
    for (let hour = 9; hour <= 19; hour++) {
      const timeSlot = getRandomTime(hour);
      const detected = Math.floor(Math.random() * 8) + 8;
      const violation = Math.floor(Math.random() * Math.min(6, detected + 1));
      const deduction = 100 - (violation * 2);
      const reason = violation > 0 ? `'${violation}명 미착용'` : 'NULL';

      scoreInserts.push(
        `INSERT INTO score (user_id, score_date, time_slot, score, deduction_reason, detection_count, violation_count) VALUES ('${user}', '${dateStr}', '${timeSlot}', ${deduction}, ${reason}, ${detected}, ${violation});`
      );

      const weekKey = `${user}_${year}_${week}`;
      const monthKey = `${user}_${year}_${month}`;

      // 주간 누적
      if (!weeklyMap[weekKey]) {
        weeklyMap[weekKey] = { scores: [], start: dateStr, end: dateStr };
      }
      weeklyMap[weekKey].scores.push(deduction);
      weeklyMap[weekKey].end = dateStr;

      // 월간 누적
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { scores: [], days: new Set() };
      }
      monthlyMap[monthKey].scores.push(deduction);
      monthlyMap[monthKey].days.add(dateStr);
    }
  });

  const detected = Math.floor(Math.random() * 11) + 10;
  const violation = Math.floor(Math.random() * Math.min(7, detected + 1));
  const analysis = `'{"detected":${detected},"violation":${violation}}'`;
  const filename = `mgr001_${dateStr}.jpg`;

  imageInserts.push(
    `INSERT INTO site_image (user_id, image_date, time_slot, image_path, original_filename, file_size, upload_status, ai_analysis_result) VALUES ('${manager}', '${dateStr}', '09:00:00', '/images/${filename}', '${filename}', ${Math.floor(Math.random() * 200000) + 200000}, 'completed', ${analysis});`
  );
});

// 주간 통계 INSERT
const weeklyInserts = Object.entries(weeklyMap).map(([key, value]) => {
  const [user, year, week] = key.split('_');
  const total = value.scores.reduce((a, b) => a + b, 0);
  const avg = (total / value.scores.length).toFixed(2);
  const grade = avg >= 95 ? 'A' : avg >= 90 ? 'B' : avg >= 80 ? 'C' : 'F';
  return `INSERT INTO weekly_score (user_id, score_year, week_number, week_start_date, week_end_date, total_score, average_score, grade) VALUES ('${user}', ${year}, ${week}, '${value.start}', '${value.end}', ${total}, ${avg}, '${grade}');`;
});

// 월간 통계 INSERT
const monthlyInserts = Object.entries(monthlyMap).map(([key, value]) => {
  const [user, year, month] = key.split('_');
  const total = value.scores.reduce((a, b) => a + b, 0);
  const avg = (total / value.scores.length).toFixed(2);
  const days = value.days.size;
  const grade = avg >= 95 ? 'A' : avg >= 90 ? 'B' : avg >= 80 ? 'C' : 'F';
  return `INSERT INTO month_grade (user_id, score_year, score_month, total_score, average_score, grade, working_days) VALUES ('${user}', ${year}, ${month}, ${total}, ${avg}, '${grade}', ${days});`;
});

const output = [
  ...scoreInserts,
  '',
  ...imageInserts,
  '',
  ...weeklyInserts,
  '',
  ...monthlyInserts
].join('\n');

const outputPath = path.join(__dirname, 'dummy_insert_data.sql');
fs.writeFileSync(outputPath, output, 'utf8');
console.log('✅ dummy_insert_data.sql 파일이 생성되었습니다.');
