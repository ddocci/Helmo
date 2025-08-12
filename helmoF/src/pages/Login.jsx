import React, { useState } from 'react';
import Form from '../components/LoginComponents/Form';
import RoleToggle from '../components/LoginComponents/RoleToggle';
import '../css/Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [role, setRole] = useState('worker'); // 기본값 근로자

  return (
    <div className="login-page">
      <div className="glass-card">
        <RoleToggle role={role} setRole={setRole} />
        <Form id={id} setId={setId} pw={pw} setPw={setPw} />
      </div>
    </div>
  );
};

export default Login;
