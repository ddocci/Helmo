// src/components/Header.jsx
import React, { useState } from 'react';
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();


   const goToAdminMain = () => {
    navigate('/adminmain');
  };

  const goToTodayEditPage = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    navigate(`/edit/${formattedDate}`);
  };


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button className="menu-button" onClick={toggleSidebar}>☰</button>
        </div>

        <div className="header-center">
          <div className="logo-icon" onClick={goToAdminMain}/>
        </div>

        <div className="header-right">
          {currentUser && <LogoutButton />}
        </div>
     </header>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-button" onClick={closeSidebar}>×</button>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li><a href="/adminmain">달력 페이지</a></li>
            <li onClick={goToTodayEditPage}>금일 관리 페이지</li>
            <li><a href="/statistics">통계 페이지</a></li>
          </ul>
        </div>
      </div>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Header;
