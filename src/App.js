import './App.css';
import { useEffect, useReducer, useState } from 'react';
import { CounterRedux } from './features/CounterRedux/Counter';
import Counter from './features/CounterReducer/Counter';
import Messenger from './features/messenger/messenger'

// function App({ app }) {
export default function App() {
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
    switch (action.type) {
      case 'increment': {
        return state + action.payload
      }
      case 'decrement': {
        return state - action.payload
      }
      case 'reset': {
        return initialState
      }
      default:
        return state
    }

  }

  const [counter, dispatch] = useReducer(reducer, initialState)


  const posts = [{title:'post one', body: 'This is post one'},{title:'post Two', body: 'This is post two'}]

  function getPosts(){
    let output = '';
    posts.forEach((post, index)=>{
      output += `<li>${post.title}</li>`
    })
    document.getElementById('hello').innerHTML = output;
  }

  function createPosts(post){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        posts.push(post);
        resolve();
      },2000)
    })
  }

  async function call() {
    await createPosts({title:'post 3', body: 'This is post 3'})
    console.log(posts)
    getPosts()
  }


  call()

  return (
    <div className="App">
      <CounterRedux />
      <Counter counter={counter} dispatch={dispatch} />
      <br />
      <Messenger/>
      <div>Hello {what}</div>
      <button onClick={() => setWhat('Sneha')}>Sneha</button>
      <button onClick={() => setWhat('Vinay')}>Vinay</button>

      <input type="checkbox" value={checked} onChange={setChecked} />
      <label>{checked ? "Checked" : "Not Checked"}</label>

      <div id='hello'></div>
    </div>
  );
}
