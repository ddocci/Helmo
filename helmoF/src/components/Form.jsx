import React from 'react';
import '../css/Form.css';

const Form = ({ id, setId, pw, setPw }) => {
  return (
    <div className="form-wrapper">
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        required
      />
      <button type="submit" className="login-submit-button">
        SIGN IN
      </button>
    </div>
  );
};

export default Form;
