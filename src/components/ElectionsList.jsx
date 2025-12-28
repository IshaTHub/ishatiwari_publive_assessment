import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useElection } from "../context/ElectionContext";
import "../styles/elections.css";

const ElectionsList = () => {
  const navigate = useNavigate();
  const { elections, selectElection } = useElection();
  const [filter, setFilter] = useState("all");

  const filtered = elections.filter(
    (e) => filter === "all" || e.status === filter
  );

  const handleCardClick = async (election) => {
    await selectElection(election.id);
    navigate(`/elections/${election.id}`);
  };

  return (
    <div className="page">
      <h1>Elections</h1>

      <div className="filter-bar">
        <button
          onClick={() => setFilter("all")}
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("upcoming")}
          className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
        >
          Upcoming
        </button>
      </div>

      <div className="election-grid">
        {filtered.map((election) => (
          <div
            key={election.id}
            className="election-card"
            onClick={() => handleCardClick(election)}
          >
            <h3>{election.name}</h3>
            <p>Date: {election.date}</p>
            <p>
              Status:{" "}
              <span className="status-badge">{election.status}</span>
            </p>
            <p>Constituencies: {election.constituenciesCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionsList;
