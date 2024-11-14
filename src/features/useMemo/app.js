// Todo.js
import React, { useCallback, useMemo, useState, useEffect } from "react";
import './app.css';
import Comments from './comment';

// Custom grouping function
const groupedData = (data, key) => {
    return data.reduce((acc, item) => {
        (acc[item[key]] = acc[item[key]] || []).push(item);
        return acc;
    }, {});
};

export default function Todo() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredComments, setFilteredComments] = useState({});

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                let response = await fetch('https://jsonplaceholder.typicode.com/comments');
                if (response.ok) {
                    let data = await response.json();
                    const groupedPosts = groupedData(data, 'postId');
                    setComments(data);
                    setFilteredComments(groupedPosts);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
            setLoading(false);
        };
        getData();
    }, []);

    const filterItems = useMemo(() => {
        let filteredPosts = comments.filter((post) => post.postId === Number(searchValue));
        setFilteredComments(groupedData(filteredPosts, 'postId'));
    }, [comments, searchValue]);

    return (
        <>
            <div className="header">Comments</div>
            <label htmlFor="search">Search by Post ID:</label>
            <input
                type="text"
                value={searchValue}
                name="search"
                onChange={(event) => setSearchValue(event.target.value)}
            />
            <button type="button" onClick={filterItems}>Filter</button>
            {!loading && Object.keys(filteredComments).length !== 0 ? (
                <Comments filteredComments={filteredComments} />
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}