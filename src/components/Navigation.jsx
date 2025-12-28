import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="navigation">
      <h2 className="nav-title">Election Management System</h2>

      <div className="nav-buttons">
        <button
          onClick={() => navigate("/dashboard")}
          className="nav-btn"
        >
          CRUD Dashboard
        </button>

        <button
          onClick={() => navigate("/elections")}
          className="nav-btn"
        >
          Elections
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
