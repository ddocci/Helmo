// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // 401도 에러로 throw 하지 않게
      const res = await api.get("/me", { validateStatus: () => true });
      if (res.status === 200 && res.data?.user) {
        setCurrentUser(res.data.user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
