import React, { useCallback, useState, useEffect } from "react";
import './app.css';
import Comments from './cooment'

const groupedData = (data, val) => {
    return Object.groupBy(data, (post) => post[val])
}
export default function Todo() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [filteredComments, setFilteredComments] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            setComments([])
            let response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (response.ok) {
                let data = await response.json();
                const groupedPosts = groupedData(data, 'postId')
                setComments(data)
                setFilteredComments(groupedPosts)
            }
            setLoading(false)
        }
        getData()
    }, [])

    const filterItems = useCallback(() => {
        let filteredPosts = comments.filter((post) => post.postId === Number(searchValue))
        setFilteredComments(groupedData(filteredPosts, 'postId'))
    }, [comments, searchValue])

    return (
        <>
            <div className="header">Comments</div>
            <label htmlFor="search"></label><input type="text" value={searchValue} name='search' onChange={(event) => setSearchValue(event.target.value)} />
            <button type="button" onClick={filterItems}>Filter</button>
            {!loading && Object.keys(filteredComments).length !== 0 && <Comments filterItems={filterItems} />}
            {/* {!loading && Object.keys(filteredComments).length !== 0 && Object.entries(filteredComments).map(([postId, post_comments]) => <div className='post-wrapper' key={postId}>
                <div className="post-title">{postId}</div>
                {post_comments.length !== 0 && post_comments.map((comment) => (<div key={comment.id} className="Comment">
                    <div className="commnet-title">{comment.id + ' - ' + comment.name + ' @ ' + comment.email}</div>
                    <div className="commnet-subject">{comment.body}</div>
                </div>))}
            </div>)} */}
        </>
    )
}