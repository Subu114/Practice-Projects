import { useState } from 'react';
import axios from 'axios';

const useSignInGoogle = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = async (googleId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:5000/api/v1/users/googleSignIn', { googleId });

            const { userId, token } = response.data;

            setUserId(userId);
            setToken(token);
            return { userId, token, error, loading };

        } catch (err) {
            console.error('Error signing in with Google:', err);
            setError('Failed to sign in with Google');

        } finally {
            setLoading(false);
        }
    };

    return { userId, token, error, loading, signInWithGoogle };
};

export default useSignInGoogle;
