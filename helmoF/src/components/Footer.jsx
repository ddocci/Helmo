import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import '../css/Footer.css';

const Footer = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <footer className="footer">
    <div className="footer-content">
        <span className="footer-text">© 2025 HELMO 시스템</span>
        {currentUser && <LogoutButton />}
    </div>
    </footer>
  );
};

export default Footer;