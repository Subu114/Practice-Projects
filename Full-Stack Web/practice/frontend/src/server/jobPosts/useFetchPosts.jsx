import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPosts = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/jobposts?search=`, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                setJobPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchJobPosts();
    }, []);

    return { jobPosts, loading, error };
};

export default useFetchPosts;
