import React from 'react';
import useFetch from './useFetch';

const DataFetchingComponent = () => {
    const { data, loading, error } = useFetch('http://localhost:8080/api/content');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataFetchingComponent;
