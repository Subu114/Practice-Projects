import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = ({ onSubmit }) => {
  const [uType, setUType] = useState('');

  const handleTypeSubmit = () => {
    if (!uType) {
      alert('Please select a type and submit');
      return;
    }
    onSubmit(uType);
  };

  return (
    <div>
      <p>Please enter user type before proceeding</p>
      <label>User Type:</label>
      <select value={uType} onChange={(e) => setUType(e.target.value)} required>
        <option value="">Select User Type</option>
        <option value="employer">Employer</option>
        <option value="job_seeker">Job Seeker</option>
      </select>
      <button onClick={handleTypeSubmit}>Done</button>
    </div>
  );
};

export default UserTypeSelection;
