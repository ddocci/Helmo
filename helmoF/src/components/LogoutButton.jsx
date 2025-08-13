import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../axios";
import '../css/Header.css'; // 스타일 분리

const LogoutButton = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
    </button>
  );
};

export default LogoutButton;