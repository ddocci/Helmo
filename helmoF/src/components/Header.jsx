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

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const goToEditPage = () => {
    const formatted = formatDate(selectedDate);
    navigate(`/edit/${formatted}`);
  };

   const goToAdminMain = () => {
    navigate('/adminmain');
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
            <li><a onClick={goToEditPage}>관리자 페이지</a></li>
            <li><a href="/statistics">통계 페이지</a></li>
          </ul>
        </div>
      </div>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Header;