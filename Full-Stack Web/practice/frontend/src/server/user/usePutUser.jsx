import { useState } from 'react';
import axios from 'axios';

const usePutUser = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUser = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', credentials);
      console.log(response.data); 

      const { userId, token, userType } = response.data; 
      setUserId(userId);
      setToken(token);
      setUserType(userType);

      return { userId, token, error, userType, loading }; 
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return { userId, token, error, loading, userType, updateUser };
};

export default usePutUser;
