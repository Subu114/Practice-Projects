import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerHome from './EmployerHome';
import JobSeekerHome from './JobSeekerHome';
import UserTypeSelection from './User/UserTypeSelection';

const Home = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const handleUserTypeSubmit = (uType) => {
    localStorage.setItem('userType', uType);
    navigate('/home');
  };

  useEffect(() => {
    if (userType === 'employer') {
      navigate('/home/employer');
    } else if (userType === 'job_seeker') {
      navigate('/home/job_seeker');
    }
  }, [userType, navigate]);

  if (!userType) {
    return <UserTypeSelection onSubmit={handleUserTypeSubmit} />;
  }

  return null; // Optionally, you can add a loading state or message here
};

export default Home;
