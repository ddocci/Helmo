import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Workmain from './pages/Workmain';
import Adminmain from './pages/Adminmain';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';
import CalendarPage from './pages/CalendarPage';
import CalendarDashboard from './pages/CalendarDashboard'; // ✅ 추가
import UserCalendarPage from './pages/UserCalendarPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/workmain/:id" element={<Workmain />} />
        <Route path="/adminmain" element={<Adminmain />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar/dashboard" element={<CalendarDashboard />} /> {/* ✅ 추가 */}
        <Route path="/edit" element={<Edit />} />
        <Route path="/*" element={<Notfound />} />
        <Route path="/user/main" element={<UserCalendarPage />} />
      </Routes>
    </>
  );
}

export default App;

