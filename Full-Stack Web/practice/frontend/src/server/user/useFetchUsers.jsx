import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUsers = (url, search) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {

        setLoading(true);
        setError(false);

        const response = await axios.get(`${url}${search}`, {
          signal: controller.signal
        });

        if (response && response.data && Array.isArray(response.data)) {
          setData(response.data);
          console.log(response.data);
        } 

        
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request Cancelled:", err.message);
          return;
        }

        console.error("Error while fetching:", err);
        setError(true);

      } finally {
        setLoading(false);
      }
    };  

    fetchData();

    // Cleanup function fOr unmounting
    return () => {
      controller.abort();
    };
  }, []);

  return { data, error, loading };
};

export default useFetchUsers;
