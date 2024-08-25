import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(''); // Assuming userType can be 'employer' or 'job_seeker'

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                username,
                email,
                password,
                user_type: userType
            };

            const response = await axios.post('http://localhost:5000/api/v1/users/register', userData);

            console.log('Registration successful!', response.data);
            // Optionally, redirect to another page or show a success message
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle error: show error message to user, log, etc.
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{border : "2px solid black", padding : 50}}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='true' />
                </div>
                <div>
                    <label>User Type:</label>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                        <option value="">Select User Type</option>
                        <option value="employer">Employer</option>
                        <option value="job_seeker">Job Seeker</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
            <div style={{ marginTop: 50 }}>
                <p>Already have an Account ? </p>
                <button style={{ background: "green" }} onClick={() => { navigate("/") }}>Sign In!</button>
            </div><br></br><br></br>
            <div>
                <hr></hr>
                <p>Register Using Google : </p><br></br>
                <button onClick={() => { navigate("/google") }}><img src='https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png' alt='Google Icon' width={50} height={50}></img></button>
                <hr></hr>
            </div>
        </div>
    );
};

export default Register;
