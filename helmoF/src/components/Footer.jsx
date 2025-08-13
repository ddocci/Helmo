import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import '../css/Footer.css';

const Footer = () => {

  return (
    <footer className="footer">
        <span className="footer-text">© 2025 HELMO 시스템</span>
    </footer>
  );
};

export default Footer;