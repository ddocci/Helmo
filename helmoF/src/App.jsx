import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 페이지 import...
import Adminmain from './pages/Adminmain';
import CalendarDashboard from './pages/CalendarDashboard';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Notfound from './pages/Notfound';
import UserCalendarPage from './pages/UserCalendarPage';
import UserNavbar from './pages/UserNavbar';
import UserSummaryBox from './components/UserSummaryBox';
import Workmain from './pages/Workmain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Adminmain />} />
      <Route path="/calendar-dashboard" element={<CalendarDashboard />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/user-calendar" element={<UserCalendarPage />} />
      <Route path="/user-navbar" element={<UserNavbar />} />
      <Route path="/user-summary" element={<UserSummaryBox />} />
      <Route path="/workmain" element={<Workmain />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;




