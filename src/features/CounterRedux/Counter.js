import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './counter.css';
import { increment, decrement, reset, selectCount, increaseByAmount, addasync } from './counterslice';

export default function CounterRedux() {
    const dispatch = useDispatch();
    const count = useSelector(selectCount) //state => state.counter.value
    return (
        <>
            <div className="row">
                <button
                    className="button"
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                <span className="value">{count}</span>
                <button
                    className="button"
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                &nbsp;&nbsp;
                <button className="button"
                    aria-label="Reset value" onClick={() => dispatch(reset())}> Reset</button>
            </div>
            <div className="row">
                <button className="button" aria-label="Add by 5" onClick={() => dispatch(increaseByAmount(5))}>Increase By 5</button>
                &nbsp;
                <button className="asyncButton" onClick={() => dispatch(addasync(5))}>Add 5 async</button>
            </div>
        </>
    )
}