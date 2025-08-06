import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UserNavbar.css';

const UserNavbar = () => {
  return (
    <nav className="user-navbar">
      <div className="logo">
        <Link to="/user-calendar">Helmo</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/user-calendar">달력</Link></li>
        <li><Link to="/user-summary">요약</Link></li>
        <li><Link to="/profile">프로필</Link></li>
      </ul>
      <button className="logout-btn" onClick={() => alert('로그아웃')}>
        로그아웃
      </button>
    </nav>
  );
};

export default UserNavbar;
