import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import usePutUser from '../../server/user/usePutUser';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const {updateUser } = usePutUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
      };

      const { userId, token, userType } = await updateUser(userData);
      console.log('User ID:', userId);
      console.log('Token:', token);
      console.log('User Type:', userType);

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);


      console.log('Login successful!');
      console.log(userId)
      
      navigate("/home")
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <div style={{ marginTop: 50 }}>
        <p>Don't have an Account?</p>
        <button style={{ background: 'green' }} onClick={() => navigate('/register')}>
          Register!
        </button>
      </div>
      <div>
        <hr />
        <p>Register Using Google:</p>
        <br />
        <button onClick={() => navigate('/google')}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
            alt="Google Icon"
            width={50}
            height={50}
          />
        </button>
        <hr />
      </div>
    </div>
  );
};

export default SignIn;
