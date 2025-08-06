import React, { useContext } from 'react'
import { Navigate, useLocation, useParams } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();
  // const { userId } = useParams();


  // 아직 로그인 여부를 확인 중일 때 (로딩중)
  if (loading === true) {
    return <></>; 
  }

  // 로그인 안 됨
  if (!currentUser) {
    alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 권한이 없는 경우
  if (!allowedRoles.includes(currentUser.role)) {
    alert("접근 권한이 없는 페이지입니다.");
    return <Navigate to="/redirect" replace />;
  }

  // // 다른 사용자의 페이지에 접근하려고 하는 경우
  // if (userId && currentUser.userId !== userId) {
  //   alert("다른 유저의 페이지에 접근할 수 없습니다.");
  //   return <Navigate to="/redirect" replace />;
  // }

  // 통과
  return children;
};

export default PrivateRoute;