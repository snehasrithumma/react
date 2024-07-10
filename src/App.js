import logo from './logo.svg';
import './App.css';
import { useEffect, useReducer, useState } from 'react';
import { CounterRedux } from './features/CounterRedux/Counter';
import Counter from './features/CounterReducer/Counter';

function App({ app }) {
  const [what, setWhat] = useState('Sasha');
  const [checked, setChecked] = useReducer((checked) => !checked, false)
  useEffect(() => {
    console.log(`hello ${what}`)
  }, [what])



  //   The useReducer Hook is similar to useState—you must pass it an initial state and it returns a stateful value and a way to set state (in this case, the dispatch function). But it’s a little different.

  // The useReducer Hook takes two arguments:

  // 1. A reducer function
  // 2. An initial state
  // And it returns:

  // 1. A stateful value
  // 2. A dispatch function (to “dispatch” user actions to the reducer)

  let initialState = 0;

  const reducer = (state, action) => {
    switch (action.type){
      case 'increment':{
        return state + action.payload
      }
      case 'decrement':{
        return state - action.payload
      }
      case 'reset':{
        return initialState
      }
      default:
        return state
    }

  }

  const [counter, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <CounterRedux />
      <Counter counter={counter} dispatch={dispatch} />
      <br />
      <div>Hello {what}</div>
      <button onClick={() => setWhat('Sneha')}>Sneha</button>
      <button onClick={() => setWhat('Vinay')}>Vinay</button>

      <input type="checkbox" value={checked} onChange={setChecked} />
      <label>{checked ? "Checked" : "Not Checked"}</label>
    </div>
  );
}

export default App;
