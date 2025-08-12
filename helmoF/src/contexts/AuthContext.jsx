// 로그인 인증 여부 정보 저장
import React, { createContext, useState, useEffect } from 'react'

import axios from "../axios"; //withCredentials: true(쿠키 기반 인증이 설정된 인스턴스)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); //로그인 시 로딩 확인

    useEffect(()=>{
        const checkLogin = async () => {
            try{
                const res = await axios.get("/me");
                setCurrentUser(res.data.data);
            } catch(err) {
                setCurrentUser(null);
            } finally {
                setLoading(false); //로딩 완료
            }
        };

        checkLogin();
    },[])

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};