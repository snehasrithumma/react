// 3. Memoizing Computations with useMemo

import React, { useMemo, useState } from 'react';

function ExpensiveComponent({ number }) {
    const computeExpensiveValue = (num) => {
        console.log("Computing expensive value...");
        return num * 2;
    };

    const expensiveValue = useMemo(() => computeExpensiveValue(number), [number]);

    return <div>{expensiveValue}</div>;
}

export default ExpensiveComponent;

// The function computeExpensiveValue only runs when number changes,
//  rather than on every render, thanks to useMemo.