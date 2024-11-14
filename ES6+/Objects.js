const x = { 'a': [1, 2, 3], 'b': { 'red': 'blue' }, 'c': 0 }

//object or not
console.log(typeof x === 'object' && !Array.isArray(x) && x !== null)


// Deep Equality Check

const obj1 = { a: 1, b: { c: { 'red': 0 } } };
const obj2 = { a: 1, b: { c: { 'red': 0 } } };

function deep(obj1, obj2) {
    if (obj1 === obj2) { return true };
    if (obj1 == null || obj2 == null) { return false };
    if (typeof (obj1) !== 'object' || typeof (obj2) !== 'object') { return false; }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) { return false; }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deep(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true
}
console.log(deep(obj1, obj2))