import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobSeekerReq.css'; 

const EmployeeJobPosts = () => {
    const [applications, setApplications] = useState([]);
    const [postings, setPostings] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("userId");

        try {
            const response = await axios.get(`http://localhost:5000/api/v1/jobapplications/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    user_id
                }
            });
            const response2 = await axios.get(`http://localhost:5000/api/v1/jobposts?searchId=${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                
            });
            console.log(response.data)
            setApplications(response.data);
            console.log(response2.data);
        } catch (error) {
            console.error("Error fetching job applications", error.message);
        }
    };

    const handleDelete = async (applicationId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/v1/jobapplications/delete/${applicationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Update applications state after deletion
            setApplications(applications.filter(app => app.application_id !== applicationId));

            console.log("Successfully deleted job application");
        } catch (error) {
            console.error("Error deleting job application:", error.message);
        }
    };

    return (
        <div>
            <h1>Response to my Job Posts</h1>
            {applications.length > 0 ? (
                applications.map((app) => (
                    <div key={app.application_id} className="job-application">
                        <h2>Application ID: {app.application_id}</h2>
                        <p>Job ID: {app.job_id}</p>
                        <p>User ID: {app.user_id}</p>
                        <p>Status: {app.application_status}</p>
                        {/* <button onClick={() => handleDelete(app.application_id)}>Delete</button> */}
                    </div>
                ))
            ) : (
                <p>No job applications found.</p>
            )}
        </div>
    );
}

export default EmployeeJobPosts;
