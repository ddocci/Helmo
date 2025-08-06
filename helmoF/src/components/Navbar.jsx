import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="logo">😊</span>
        <span className="title">프로그램 이름</span>
      </div>
      <div className="navbar-right">
        {/* 오른쪽 영역 (로그인 정보 등) */}
        <input className="search" placeholder="검색" />
      </div>
    </div>
  );
};

export default Navbar;