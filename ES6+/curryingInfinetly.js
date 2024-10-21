
function add(val) {
    let counter = val;
    function inner(nextVal) {
        console.log(nextVal)
        if (nextVal !== undefined) {
            counter += nextVal;
            return inner;
        }
        return counter;
    }
    return inner;
}


console.log(add(1)(2)(10)(4)()); console.log(add(5)(5)(5)(5)(5)());




