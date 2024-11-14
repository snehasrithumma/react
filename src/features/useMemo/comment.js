import React, { useMemo } from "react"

export default function Comments({ filterItems }) {
    const filteredCooments = useMemo(() => filterItems(), [filterItems])
    return (<div>
        {Object.keys(filteredCooments).length !== 0 && Object.entries(filteredCooments).map(([postId, post_comments]) => <div className='post-wrapper' key={postId}>
            <div className="post-title">{postId}</div>
            {post_comments.length !== 0 && post_comments.map((comment) => (<div key={comment.id} className="Comment">
                <div className="commnet-title">{comment.id + ' - ' + comment.name + ' @ ' + comment.email}</div>
                <div className="commnet-subject">{comment.body}</div>
            </div>))}
        </div>)}
    </div>)
}