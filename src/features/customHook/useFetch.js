// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url, retries, delay) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async (attempt) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                    setError('')
                }
            } catch (error) {
                if (attempt < retries) {
                    setTimeout(() => {
                        fetchData(attempt + 1)
                    }, delay);
                }
                else {
                    setData([]);
                    setLoading(false);
                    console.log('Tried ' + retries + 'with dealy of' + delay)
                    setError(error);
                }
            } finally {
                if (attempt === retries) {
                    setLoading(false);
                }
            }
        };
        setLoading(true)
        fetchData(0);
        return () => setLoading(false);
    }, [url, retries, delay]);

    return { data, loading, error };
};

export default useFetch;
