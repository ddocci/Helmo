import React from 'react';
import "../css/Header.css"

const Header = ({text}) => {
  return (
    <header className="Header">
      <div className="Header_left">
        <img className="Header_logo" src="../public/logo.png" alt="Helmo logo" />
      </div>
      <div className='Header_center'>
        <span className='Header_noticeText'>{text}</span>
      </div>
    </header>
  );
};

export default Header;
