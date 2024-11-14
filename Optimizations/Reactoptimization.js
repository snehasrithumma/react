

// 2. Memoizing Functions with useCallback
// When passing functions as props to child components,
// use useCallback to memoize these functions and avoid recreating them on each render.


import React, { useState, useCallback } from 'react';
import ChildComponent from './reactmemo';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("Hello");

  const increment = useCallback(() => setCount(count + 1), [count]);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <ChildComponent data={data} />
    </div>
  );
}

export default ParentComponent;

