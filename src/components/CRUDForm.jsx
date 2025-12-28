import React, { useState } from 'react';
import '../styles/dashboard.css';

const CRUDForm = ({ fields, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{initialData ? 'Edit' : 'Add'} Item</h2>
        
        {fields.map(field => (
          <div key={field} className="form-group">
            <label>{field}</label>
            <input
              type="text"
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              className="form-input"
            />
          </div>
        ))}

        <div className="form-actions">
          <button onClick={handleSubmit} className="btn-primary">
            Save
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRUDForm;