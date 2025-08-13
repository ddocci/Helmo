import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1) 아직 인증 상태 로딩 중이면 렌더 막기
  if (loading) return null;

  // 2) 비로그인 → 로그인으로
  if (!currentUser) {
    // 필요하면 alert 주석 해제
    // alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3) 권한 체크(allowedRoles가 주어졌을 때만)
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(currentUser.role)) {
      // 필요하면 alert 주석 해제
      // alert("접근 권한이 없는 페이지입니다.");
      return <Navigate to="/redirect" replace />;
    }
  }

  // 4) 통과
  return children;
};

export default PrivateRoute;
