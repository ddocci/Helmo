import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CalendarMain from '../components/CalendarMain';
import '../css/CalendarDashboard.css';

const CalendarDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <CalendarMain />
      </div>
    </div>
  );
};

export default CalendarDashboard;