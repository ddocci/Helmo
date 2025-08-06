import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // 백엔드 주소
  withCredentials: true                // 쿠키 기반 인증 사용할 경우 필수
});

export default instance;