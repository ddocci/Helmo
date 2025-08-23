import axios from "axios";

const api = axios.create({
  baseURL: "/api",        // 프록시 경유
  withCredentials: true,  // 쿠키 동봉
});

export default api;
