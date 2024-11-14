import React from "react";

const Comments = React.memo(({ filteredComments }) => {
    return (
        <div>
            {Object.entries(filteredComments).map(([postId, postComments]) => (
                <div className="post-wrapper" key={postId}>
                    <div className="post-title">Post ID: {postId}</div>
                    {postComments.map((comment) => (
                        <div key={comment.id} className="Comment">
                            <div className="comment-title">
                                {comment.id} - {comment.name} @ {comment.email}
                            </div>
                            <div className="comment-subject">{comment.body}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});
export default Comments;