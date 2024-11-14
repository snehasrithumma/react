
function memoize(fn) {
    let data = {}
    return (...args) => {
        let key = JSON.stringify(args);
        if (key in data) {
            console.log('from cache')
            return data[key]
        }
        else {
            let result = fn(args)
            data[key] = result
            return result
        }
    }
}

const slowFunction = (args) => {
    return args.reduce((accum, val) => accum + val, 0)
}

const memoizedFunction = memoize(slowFunction)

console.log(memoizedFunction(1, 2, 9, 8))
console.log(memoizedFunction(1, 2, 9, 8))




















