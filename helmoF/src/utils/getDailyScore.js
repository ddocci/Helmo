import axios from "../axios";
import { toYmdLocal } from "../utils/dateToYmd";

/**
 * 간단 일별 조회 공용 핸들러 팩토리
 * - role: 'worker' | 'admin'
 * - setSelectedDate, setSelectedData, setLoading, setError: 페이지 state setter
 * - opts.api: (선택) 커스텀 axios 인스턴스 (없으면 기본 axios 사용)
 */
export const makeHandleDateClick = ({ role, setSelectedDate, setSelectedData, setLoading, setError }) => {
  // 실제 클릭 핸들러를 반환
  return async (dateObjOrStr) => {
    // 1) UI 선택 상태 갱신
    const dateObj = dateObjOrStr instanceof Date ? dateObjOrStr : new Date(dateObjOrStr);
    setSelectedDate(dateObj);

    // 날짜를 YYYY-MM-DD 문자열로 변환 (타임존 문제 해결 포인트)
    const ymd = toYmdLocal(dateObj);

    setLoading(true);
    setError("");

    try {
      // 역할별(작업자/관리자) 엔드포인트 분기
      // 백엔드에서 worker/admin 전용 계산법이 이미 구현되어 있으니 경로만 호출
      const url = role === "admin" ? "/admin/score-daily" : "/worker/score-daily";

      const { data } = await axios.get(url, { params: { date: ymd } });
      const payload = data?.data || {};
      const weekly  = payload.weekly || {};

      // 카드용 데이터로 최소 가공
      const score            = payload.score ?? "-";
      const totalViolation   = payload.violationTotal ?? "-";
      const recordedDuration = payload.recordedDuration ?? "-";
      const weeklyGrade      = weekly.grade ?? "-";
      const weeklyAvg        = weekly.average_score ?? "-";

      setSelectedData({
        score,
        people: totalViolation,   
        hours: recordedDuration,
        weeklyGrade,
        weeklyAvg,
      });
    } catch (err) {
      console.error("daily score join error", err);
      setError("통계 조회 중 오류 발생");
      setSelectedData({
        score: "-",
        people: "-",   
        hours: "-",
        weeklyGrade: "-",
        weeklyAvg: "-",
      });
    } finally {
      setLoading(false);
    }
  };
};