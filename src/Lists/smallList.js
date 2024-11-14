import React from "react";

const SmallListItem = ({ person }) => {
    const { postId, id, name, email } = person;
    return (<p key={id}>Name:{name} Email:{email}</p>)
}

export default SmallListItem