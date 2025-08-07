import React from 'react';

const RetouchTitle = ({ year, month, day }) => {
  return <h2 className="retouch-title">{year}년 {month}월 {day}일</h2>;
};

export default RetouchTitle;
