export const toYmdLocal = (d) => {
  // 로컬 기준으로 YYYY-MM-DD 만들기
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};