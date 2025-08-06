import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleToggle from '../components/RoleToggle';
import { Button } from '../components/Button';
import Form from '../components/Form';
import axios from '../axios.js';
import '../css/Login.css'
import Header from '../components/Header';

import { AuthContext } from "../contexts/AuthContext"

const Login = () => {
  const [role, setRole] = useState('worker');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(AuthContext);

  const onClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        id,
        password: pw,
        role,
      });

      if (response.data.success) {
        const userId = response.data.userId;
        setCurrentUser({userId: userId, role});// 로그인 상태 저장
        if (role === 'admin') {
          navigate(`/adminmain`);
        } else {
          navigate(`/workmain`);
        }
      } else {
        alert('로그인 실패했심더');
      }
    } catch (err) {
      console.error(err);
      alert('서버 터졌심더...');
    }
  };

    return (
    <div className="login-page">
        <div className="login-box">
        {/* <Header /> */}
        <div className="login-content">
            <RoleToggle role={role} setRole={setRole} />
            <Form id={id} setId={setId} pw={pw} setPw={setPw} />
            <div className="login-button-wrapper">
            <Button text="SIGN IN" type="login" onClick={onClick} />
            </div>
        </div>
        </div>
    </div>
    );

};

export default Login;
