function debounce1(fn, timeout) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(args)
        }, timeout)
    }
}

const processChange1 = debounce1(fetchResults, 1000);
processChange1('hello', 'hi')


function debounce(fn, timeout) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(args)
        }, timeout)
    }
}

function fetchResults(args) {
    console.log(args)
    console.log("Fetching input suggestions", ...args);
}
const processChange = debounce(fetchResults, 1000);
processChange('hello', 'hi')



function Person(name, age) {
    this.name = name;
    this.age = age
}

let user1 = new Person('sneha', 20)
console.log(user1.name)

class Persons {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
}
let p1 = new Persons('vk', 28)
console.log(p1.name)


const greet = function (greeting, punc, read) {
    console.log(greeting + ' ' + this.name + ' ' + punc + read)
}

greet.call(p1, 'hello')


greet.apply(p1, ['hello', '!', 'ken'])

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




















