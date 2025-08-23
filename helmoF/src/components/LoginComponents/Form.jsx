import React, { useState, useContext } from "react";
import api from "../../axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../css/Login/Form.css";

const Form = ({ id, setId, pw, setPw }) => {
  const nav = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const payload = { id: id.trim(), password: pw.trim() };
      const res = await api.post("/login", payload, { validateStatus: () => true });

      if (res.status === 200 && res.data?.success) {
        // 최신 사용자 정보로 컨텍스트 갱신
        const me = await api.get("/me", { validateStatus: () => true });
        setCurrentUser(me.data?.user || null);

        // 역할 분기는 여기서 하지 말고 RedirectRoute에서만 처리
        nav("/redirect", { replace: true });
      } else {
        alert(res.data?.message || "로그인 실패");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button type="submit" className="login-submit-button" disabled={loading}>
        {loading ? "처리 중..." : "SIGN IN"}
      </button>
    </form>
  );
};

export default Form;
