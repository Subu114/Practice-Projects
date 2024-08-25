import React, { useState } from 'react';
import useJobPosts from '../server/jobPosts/useFetchPosts';
import "./JobSeekerHome.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobSeekerHome = () => {
  const { jobPosts, loading, error } = useJobPosts();
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = async (jobId) => {
    try {
      const user_id = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      console.log(`Requesting ${jobId} through ${user_id}`)
      const res = await axios.post("http://localhost:5000/api/v1/jobapplications/create", {
        user_id: user_id,
        job_id: jobId,
        application_status : "applied"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if(res.status == 206){
        alert("Already applied for that Job")
        
        setAppliedJobs([...appliedJobs, jobId]);
        console.log(res.status); 
        return;
        
      }
      // Update UI state to mark job as applied
      setAppliedJobs([...appliedJobs, jobId]);

      console.log("Successfully applied for job");

    } catch (error) {
      console.error("Error applying for job:", error.message);
    }
  };

  const isJobApplied = (jobId) => {
    return appliedJobs.includes(jobId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <button onClick={() => navigate("/home/job_seeker/req")}>My Job Req</button>
      <div className="job-seeker-home">
        <h1>Job Seeker Home</h1>
        {jobPosts.length > 0 ? (
          <ul className="job-list">
            {jobPosts.map((job) => (
              <li key={job.job_id}>
                <h2>{job.job_id}</h2>
                <h2>{job.job_title}</h2>
                <p>{job.job_description}</p>
                <p>Location: {job.location}</p>
                <p>Salary Range: {job.salary_range}</p>
                <p>Job Type: {job.job_type}</p>
                {isJobApplied(job.employer_id) ? (
                  <button style={{ backgroundColor: 'green' }} disabled>APPLIED</button>
                ) : (
                  <button onClick={() => handleApply(job.job_id)}>Apply</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No job posts available.</p>
        )}
      </div>
    </>
  );
};

export default JobSeekerHome;
