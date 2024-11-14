import React from "react";

const LargeListItem = ({ person }) => {
    const { postId, id, name, email } = person;
    return (<div>
        <h2>{name}</h2>
        <span>@{email}</span>
    </div>)
}

export default LargeListItem