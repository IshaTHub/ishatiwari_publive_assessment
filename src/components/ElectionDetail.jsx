import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useElection } from "../context/ElectionContext";
import { apiService } from "../services/api";
import "../styles/detail.css";

const ElectionDetail = () => {
  const { id: electionId } = useParams();
  const navigate = useNavigate();
  const { currentElection } = useElection();

  const [constituencies, setConstituencies] = useState([]);
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (electionId) {
      loadElectionData();
    }
  }, [electionId]);

  const loadElectionData = async () => {
    const constData = await apiService.getConstituencies(electionId);
    const partyData = await apiService.getParties();
    const candData = await apiService.getCandidates(electionId);
    const resData = await apiService.getResults(electionId);

    setConstituencies(constData);
    setParties(partyData);
    setCandidates(candData);
    setResults(resData);
  };

  if (!currentElection) {
    return <div className="page">Loading...</div>;
  }

  return (
    <div className="page">
      <button
        onClick={() => navigate("/elections")}
        className="btn-back"
      >
        ← Back to Elections
      </button>

      <div className="detail-header">
        <h1>{currentElection.name}</h1>
        <p>
          Date: {currentElection.date} | Status: {currentElection.status}
        </p>
      </div>

      {/* Constituencies */}
      <div className="detail-section">
        <h2>Constituencies ({constituencies.length})</h2>
        <table className="detail-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Total Voters</th>
            </tr>
          </thead>
          <tbody>
            {constituencies.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.code}</td>
                <td>{c.name}</td>
                <td>{c.totalVoters.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Parties */}
      <div className="detail-section">
        <h2>Parties ({parties.length})</h2>
        <div className="party-grid">
          {parties.map((p) => (
            <div
              key={p.id}
              className="party-card"
              style={{ borderLeft: `4px solid ${p.color}` }}
            >
              <h3 style={{ color: p.color }}>{p.name}</h3>
              <p>Abbreviation: {p.abbr}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Candidates */}
      <div className="detail-section">
        <h2>Candidates ({candidates.length})</h2>
        <table className="detail-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Party</th>
              <th>Constituency ID</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>
                  <span style={{ color: c.partyColor }}>●</span> {c.party}
                </td>
                <td>{c.constituencyId}</td>
                <td>{c.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results */}
      <div className="detail-section">
        <h2>Results ({results.length})</h2>
        <table className="detail-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Candidate ID</th>
              <th>Constituency ID</th>
              <th>Votes</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className={r.winner ? "winner-row" : ""}>
                <td>{r.id}</td>
                <td>{r.candidateId}</td>
                <td>{r.constituencyId}</td>
                <td>{r.votes.toLocaleString()}</td>
                <td>{r.winner ? "✓ Winner" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElectionDetail;
