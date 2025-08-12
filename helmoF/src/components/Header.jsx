// src/components/Header.jsx
import React from 'react';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-icon" />
        <span className="logo-text">
          <span className="bold"></span>
          <span className="light"></span>
        </span>
      </div>
    </header>
  );
};

export default Header;
