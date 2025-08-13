import React from 'react';
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import '../css/WokerHeader.css';

const WorkerHeader = () => {
  const { currentUser } = useContext(AuthContext);

  return (
      <header className="header">
        <div className="header-left">
        </div>

        <div className="header-center">
          <div className="workerLogo-icon"/>
        </div>

        <div className="header-right">
          {currentUser && <LogoutButton />}
        </div>
     </header>
  );
};

export default WorkerHeader