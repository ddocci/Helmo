import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../css/Layout.css"; // CSS 파일 분리해서 스타일 적용

const Layout = () => {
  return (
    <div className="layout-container">
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;