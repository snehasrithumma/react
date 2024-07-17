import React from 'react';

const Counter = ({ counter, dispatch }) => {
  return (
    <div>
      <h1>Count - {counter}</h1>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        Increment by 5
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
        Decrement by 5
      </button>
    </div>
  );
};

export default Counter;
