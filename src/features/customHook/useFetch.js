// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url, retries, delay) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController(); // For aborting fetch when component unmounts
        const signal = controller.signal;

        const fetchData = async (attempt) => {
            setLoading(true);
            try {
                const response = await fetch(url, { signal });

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                    setError(null);  // Clear error on success
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } catch (err) {
                if (attempt < retries) {
                    setTimeout(() => fetchData(attempt + 1), delay);
                } else {
                    console.error(`Failed after ${retries} attempts with delay of ${delay}ms`);
                    setError(err.message || 'Failed to fetch');
                    setData(null);
                }
            } finally {
                setLoading(false); // Set loading to false after all attempts
            }
        };

        fetchData(0); // Start fetching data

        return () => {
            controller.abort(); // Cleanup function to abort fetch if component unmounts
        };
    }, [url, retries, delay]);

    return { data, loading, error };
};

export default useFetch;