import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import CRUDForm from './CRUDForm';
import '../styles/dashboard.css';

const CRUDDashboard = () => {
  const [activeTab, setActiveTab] = useState('elections');
  const [data, setData] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    const methods = {
      elections: apiService.getElections,
      constituencies: apiService.getConstituencies,
      parties: apiService.getParties,
      candidates: apiService.getCandidates,
      results: apiService.getResults
    };
    const result = await methods[activeTab]();
    setData({ ...data, [activeTab]: result });
  };

  const handleCreate = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const methods = {
      elections: apiService.deleteElection,
      constituencies: apiService.deleteConstituency,
      parties: apiService.deleteParty,
      candidates: apiService.deleteCandidate,
      results: apiService.deleteResult
    };
    await methods[activeTab](id);
    loadData();
  };

  const handleSave = async (formData) => {
    const createMethods = {
      elections: apiService.createElection,
      constituencies: apiService.createConstituency,
      parties: apiService.createParty,
      candidates: apiService.createCandidate,
      results: apiService.createResult
    };
    const updateMethods = {
      elections: apiService.updateElection,
      constituencies: apiService.updateConstituency,
      parties: apiService.updateParty,
      candidates: apiService.updateCandidate,
      results: apiService.updateResult
    };

    if (editItem) {
      await updateMethods[activeTab](editItem.id, formData);
    } else {
      await createMethods[activeTab](formData);
    }
    setShowForm(false);
    loadData();
  };

  const configs = {
    elections: {
      fields: ['id', 'name', 'date', 'status'],
      formFields: ['name', 'date', 'status', 'constituenciesCount']
    },
    constituencies: {
      fields: ['id', 'code', 'name', 'electionId', 'totalVoters'],
      formFields: ['code', 'name', 'electionId', 'totalVoters']
    },
    parties: {
      fields: ['id', 'name', 'abbr', 'color'],
      formFields: ['name', 'abbr', 'color']
    },
    candidates: {
      fields: ['id', 'name', 'partyId', 'constituencyId', 'age'],
      formFields: ['name', 'partyId', 'constituencyId', 'age', 'bio']
    },
    results: {
      fields: ['id', 'candidateId', 'constituencyId', 'votes', 'winner'],
      formFields: ['candidateId', 'constituencyId', 'votes', 'winner']
    }
  };

  const currentData = data[activeTab] || [];
  const config = configs[activeTab];

  return (
    <div className="page">
      <h1>CRUD Dashboard</h1>

      <div className="tabs">
        {Object.keys(configs).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'tab-active' : 'tab'}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleCreate} className="btn-primary">
          + Add {activeTab}
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {config.fields.map(f => (
              <th key={f}>{f.toUpperCase()}</th>
            ))}
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(item => (
            <tr key={item.id}>
              {config.fields.map(f => (
                <td key={f}>{String(item[f])}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(item)} className="btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <CRUDForm
          fields={config.formFields}
          initialData={editItem}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default CRUDDashboard;