import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleToggle from '../components/RoleToggle';
import Form from '../components/Form';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
  const [role, setRole] = useState('worker');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        id,
        password: pw,
        role,
      });

      if (response.data.success) {
        const userId = response.data.userId;
        const roleFromServer = response.data.role;

        if (roleFromServer === 'admin') {
          navigate(`/adminmain/${userId}`);
        } else if (roleFromServer === 'user' || roleFromServer === 'worker') {
          navigate(`/workmain/${userId}`);
        } else {
          alert('알 수 없는 역할입니다.');
        }
      } else {
        alert(response.data.message || '로그인 실패');
      }
    } catch (err) {
      console.error(err);
      alert('서버 에러 발생');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-content">
          <form onSubmit={onSubmit}>
            <RoleToggle role={role} setRole={setRole} />
            <Form id={id} setId={setId} pw={pw} setPw={setPw} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
