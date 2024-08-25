import { useState, react } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';


import './App.css';
import Register from './components/User/Register';
import Home from './components/Home';
import SignIn from './components/User/SignIn';
import OtherAuth from './components/OtherAuth';
import EmployerHome from './components/EmployerHome';
import JobSeekerHome from './components/JobSeekerHome';
import JobPosts from './components/jobPost/JobPosts';
import DeletePost from './components/jobPost/DeletePost';
import JobSeekerReq from './components/JobSeekerReq';
import EmployeeJobPosts from './components/EmployeeJobPosts';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/google' element={<OtherAuth />}/>
          <Route path='/home/employer' element={<EmployerHome />}/>
          <Route path='/home/employer/posts' element={<EmployeeJobPosts />}/>
          <Route path='/home/job_seeker' element={<JobSeekerHome />}/>
          <Route path='/home/job_seeker/req' element={<JobSeekerReq />}/>
          <Route path='/jobposts' element={<JobPosts />}/>
          <Route path='/deletepost' element={<DeletePost />}/>
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
