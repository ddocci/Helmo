import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext"; // 경로 맞춰주세요
import "../../css/Adminmain/Banner.css";

const Banner = () => {
  const { currentUser } = useContext(AuthContext);

  // 로그인 안 된 경우 대비
  const userName = currentUser?.name || "게스트";

  return (
    <div className="BannerBox">
      😀 안녕하세요! <strong>{userName}</strong>님! 날짜를 클릭하시면 상세 정보를 확인하실 수 있습니다.
    </div>
  );
};

export default Banner;
