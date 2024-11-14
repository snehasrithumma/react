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
