import React, { useEffect } from 'react'
import { useState } from 'react';

import useFetchUsers from '../../server/user/useFetchUsers';
import { useNavigate } from 'react-router-dom';


const JobPosts = () => {
    const [search, setSearch] = useState('');

    const { error, loading, data } =  useFetchUsers("http://localhost:5000/api/v1/jobposts?search=", search);
    
    
    return (
      <>
        <h1>Hello there</h1>
        <input
          type='text'
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          placeholder='Search by name'
        />
       
        <h2>Job Posts: {data.length}</h2>
        {loading && <h1>Your data is loading</h1>}
        {error && <h1>Something Went Wrong</h1>}
        {data.map((job) => (
          <div key={job.job_id}>
            <h5>Job ID: {job.job_id}</h5>
            <h5>Job Titile: {job.job_title}</h5>
            <h5>Job Description: {job.job_description}</h5>
            <h5>Job Location: {job.location}</h5>
            <h5>Job Salary: {job.salary_range}</h5>
            <br /><hr></hr>
          </div>
        ))}
        <button onClick={useNavigate()("/deletepost")}>Delete a post</button>
      </>
    );
  }


export default JobPosts