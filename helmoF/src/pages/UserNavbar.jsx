import React from 'react';
import '../css/UserNavbar.css';

const UserNavbar = () => {
  return (
    <div className="user-navbar">
      <span className="top-title">일반인 사용자 메인페이지</span>
      <div className="logo-area">
        <span className="logo">Hel</span><span className="logo highlight">mo</span>
      </div>
    </div>
  );
};

export default UserNavbar;
