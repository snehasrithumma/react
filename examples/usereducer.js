import React, { useReducer } from 'react';

const initialState = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateAge':
      return { ...state, age: action.payload };
    case 'updateCity':
      return {
        ...state,
        address: { ...state.address, city: action.payload },
      };
    default:
      return state;
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <p>City: {state.address.city}</p>
      <button onClick={() => dispatch({ type: 'updateAge', payload: 31 })}>
        Update Age
      </button>
      <button onClick={() => dispatch({ type: 'updateCity', payload: 'Los Angeles' })}>
        Update City
      </button>
    </div>
  );
}
