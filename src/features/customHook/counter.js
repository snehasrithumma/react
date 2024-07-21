import React from 'react';
import useLocalStorage from './useLocalStorage';

const CounterComponent = () => {
    const [count, setCount] = useLocalStorage('count', 0);

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Increment-1</button>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
};

export default CounterComponent;
