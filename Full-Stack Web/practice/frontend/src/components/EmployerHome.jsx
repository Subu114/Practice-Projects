import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployerHome = () => {
  const userId = localStorage.getItem('userId');
  console.log("USER ID : ", userId)
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobType, setJobType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId) {
      setError('User ID is not found. Please log in again.');
      return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('User is not authenticated');
      return;
    }

    try {
      const jobPostData = {
        employer_id: userId,
        job_title: jobTitle,
        job_description: jobDescription,
        location: location,
        salary_range: salaryRange,
        job_type: jobType,
      };

      console.log(jobPostData)
      const response = await axios.post('http://localhost:5000/api/v1/jobposts/create', jobPostData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess('Job post created successfully!');
        setJobTitle('');
        setJobDescription('');
        setLocation('');
        setSalaryRange('');
        setJobType('');
      } else {
        setError('Failed to create job post.');
      }
    } catch (err) {
      console.error('Error creating job post:', err);
      setError('An error occurred while creating the job post.');
    }
  };

  return (
    <div>
      <h2>Create Jdob Post</h2>
      <form onSubmit={handleSubmit} autoComplete='true'>
        <div>
          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Salary Range:</label>
          <input type="text" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} required />
        </div>
        <div>
          <label>Job Type:</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} required>
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{background : "green"}}>Create Job Post</button>
        <hr></hr>
        <div>
          <button onClick={() => {navigate("/home/employer/posts")}}> View My job posts</button>
        </div>
        <div>
          <button onClick={() => {navigate("/jobposts")}}> Delete job posts</button>
        </div>
      </form>
    </div>
  );
};

export default EmployerHome;
