

function add(...val) {

    let counter = val.reduce((acc, sum) => acc + sum, 0);

    function inner(...nextVals) {
        if (nextVals.length > 0) {
            // Sum all nextVals and add to counter
            counter += nextVals.reduce((sum, current) => sum + current, 0);
            return inner; // Return inner for further chaining
        }
        return counter; // Return the total when no arguments are provided
    }

    return inner;
}


console.log(add(1, 2)(2)(10)(4)());
console.log(add(5)(5)(5)(5)(5)());


function sum(a, b, c) {
    return a + b + c
}
console.log(add(1, 2, 3))

const curry = (fn) => {
    const curried = (...args) => {
        if (fn.length !== args.length) {
            return curried.bind(null, ...args)
        }
        return fn(...args)
    }
    return curried
}

const curryAdd = curry(sum)
console.log(curryAdd(1, 2, 3))


function partialxor(a, b, c) {
    // Filter out undefined values to count how many arguments were provided
    const args = [a, b, c].filter(arg => arg !== undefined);

    // If we already have three arguments, compute the XOR and return it
    if (args.length === 3) {
        return a ^ b ^ c;
    }

    // Otherwise, return a new function that will accept more arguments
    return function (...newArgs) {
        return partialxor(...args, ...newArgs); // Recursively call with accumulated args
    };
}
console.log(partialxor(1, 2, 3))



function currys(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args)
        }
        return (argument) => argument === undefined ? curried.apply(this, args) : curried.apply(this, [...args, argument])
    }
}

function adds(a, b, c) {
    return a + b + c;
}

const curriedAdd = currys(adds);
console.log(curriedAdd(3)(4)(3)) // 7
