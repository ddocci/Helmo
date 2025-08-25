// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import PrivateRoute from "./routes/PrivateRoute";
import RedirectRoute from "./routes/RedirectRoute";

import Login from "./pages/Login";
import Workmain from "./pages/Workmain";
import Adminmain from "./pages/Adminmain";
import Edit from "./pages/Edit";
import DailyResult from "./pages/DailyResult"; // ✅ 결과보기 페이지 추가
import Statistics from "./pages/Statistics";
import Retouch from "./pages/Retouch";
import Notfound from "./pages/Notfound";

export default function App() {
  const { pathname } = useLocation();
  // 로그인 화면에선 헤더 숨김 (원하면 규칙 더 추가 가능)
  const hideHeader = pathname === "/" || pathname === "/login";

  return (
    <AuthProvider>
      <Routes>
        {/* 로그인 관련 */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 근로자 메인 */}
        <Route
          path="/workmain"
          element={
            <PrivateRoute allowedRoles={["worker"]}>
              <Workmain />
            </PrivateRoute>
          }
        />

        {/* 관리자 메인 */}
        <Route
          path="/adminmain"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Adminmain />
            </PrivateRoute>
          }
        />

        {/* 이미지 업로드 & 분석 (Edit 페이지) */}
        <Route
          path="/edit/:date"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Edit />
            </PrivateRoute>
          }
        />

        {/* ✅ 결과 보기 페이지 */}
        <Route
          path="/result/:date"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <DailyResult />
            </PrivateRoute>
          }
        />

        {/* 통계 */}
        <Route path="/statistics" element={<Statistics />} />

        {/* 수정 */}
        <Route path="/retouch/:date" element={<Retouch />} />

        {/* 리다이렉트 */}
        <Route path="/redirect" element={<RedirectRoute />} />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthProvider>
  );
}
