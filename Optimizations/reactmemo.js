// 1. Using React.memo

import React from 'react';

const ChildComponent = React.memo(({ data }) => {
    console.log("ChildComponent rendered");
    return <div>{data}</div>;
});

export default ChildComponent;
