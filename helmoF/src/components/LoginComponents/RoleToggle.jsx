import React from 'react';
import '../../css/RoleToggle.css';

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="role-toggle-wrapper">
      <h2 className="signin-title">SIGN IN</h2>
      <div className="role-toggle">
        <span
          className={role === 'worker' ? 'active' : ''}
          onClick={() => setRole('worker')}
        >
          근로자
        </span>
        <span
          className={role === 'admin' ? 'active' : ''}
          onClick={() => setRole('admin')}
        >
          관리자
        </span>
      </div>
    </div>
  );
};

export default RoleToggle;
