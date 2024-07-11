import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Counter.module.css';
import { increment, decrement, reset, selectCount, increaseByAmount, addasync } from './counterslice';

export function CounterRedux() {
    const dispatch = useDispatch();
    const count = useSelector(selectCount) //state => state.counter.value
    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                &nbsp;&nbsp;
                <button className={styles.button}
                    aria-label="Reset value" onClick={() => dispatch(reset())}> Reset</button>
            </div>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Add by 5" onClick={()=>dispatch(increaseByAmount(5))}>Increase By 5</button>
                &nbsp;
                <button className={styles.asyncButton} onClick={()=>dispatch(addasync(5))}>Add 5 async</button>
            </div>
        </div>
    )
}