import { useReducer } from 'react';
import Counter from './Counter';

// function App({ app }) {
export default function CounterReducer() {
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
    return (
        <div className="App">
            <Counter counter={counter} dispatch={dispatch} />
        </div>)
}