import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RedirectRoute = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!currentUser) { navigate("/login", { replace: true }); return; }

    const role = String(currentUser.role || "").toLowerCase().trim();
    console.log("[RedirectRoute] role =", role); // 임시 확인용

    if (role === "worker") navigate("/workmain", { replace: true });
    else if (role === "admin") navigate("/adminmain", { replace: true });
    else navigate("/", { replace: true });
  }, [currentUser, loading, navigate]);

    return null; // 필요시 스피너 컴포넌트로 교체
  };

export default RedirectRoute;
