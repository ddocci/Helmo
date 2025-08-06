import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RedirectRoute = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    } else if (currentUser.role === "worker") {
      navigate(`/workmain`, { replace: true });
    } else if (currentUser.role === "admin") {
      navigate(`/adminmain`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  return null; // 또는 로딩 UI
};

export default RedirectRoute;