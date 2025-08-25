import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Adminmain/Header.css";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
    setMenuOpen(false);
  };

  const goToTodayEditPage = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    navigate(`/edit/${formattedDate}`);
  };

  const goToTodayResultPage = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    navigate(`/result/${formattedDate}`);
  };

  return (
    <header className="Header">
      {/* 햄버거 버튼 */}
      <div className="Header_menuIcon" onClick={toggleMenu}>
        ☰
      </div>

      {/* 로고 */}
      <img
        src="/logo.png"
        alt="Logo"
        className="Header_logo"
        onClick={() => goTo("/adminmain")}
      />

      {/* 사이드 메뉴 */}
      <div className={`SideMenu ${menuOpen ? "open" : ""}`}>
        <button className="CloseBtn" onClick={toggleMenu}>
          ✕
        </button>
        <ul className="MenuList">
          <li onClick={() => goTo("/adminmain")}>메인 페이지</li>
          <li onClick={goToTodayEditPage}>금일 관리 페이지</li>
          <li onClick={goToTodayResultPage}>금일 결과 페이지</li>
          <li onClick={() => goTo("/statistics")}>통계 페이지</li>
        </ul>

        {/* 사용자 정보 영역 */}
        <div className="UserSection">
          <span className="UserName">
            {currentUser ? `${currentUser.name} 님` : "게스트"}
          </span>
          <button className="LogoutBtn" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>

      {/* 배경 오버레이 */}
      {menuOpen && <div className="Overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
