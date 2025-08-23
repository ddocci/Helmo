// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import PrivateRoute from "./routes/PrivateRoute";
import RedirectRoute from "./routes/RedirectRoute";

import Login from "./pages/Login";
import Workmain from "./pages/Workmain";
import Adminmain from "./pages/Adminmain";
import Edit from "./pages/Edit";
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
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/workmain"
          element={
            <PrivateRoute allowedRoles={["worker"]}>
              <Workmain />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminmain"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Adminmain />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:date"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Edit />
            </PrivateRoute>
          }
        />

        <Route path="/statistics" element={<Statistics />} />
        <Route path="/retouch/:date" element={<Retouch />} />

        <Route path="/redirect" element={<RedirectRoute />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthProvider>
  );
}
