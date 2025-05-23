const x = { 'a': [1, 2, 3], 'b': { 'red': 'blue' }, 'c': 0 }

//object or not
console.log(typeof x === 'object' && !Array.isArray(x) && x !== null)


// Deep Equality Check

const value = { a: 1, b: { c: { 'red': 0 } } };
const object = { a: 1, b: { c: { 'red': 0 } } };

function deep(object1, object2) {
    if (object1 === object2) { return true };
    if (object1 == null || object2 == null) { return false };
    if (typeof (object1) !== 'object' || typeof (object2) !== 'object') { return false; }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) { return false; }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deep(object1[key], object2[key])) {
            return false;
        }
    }
    return true
}
console.log(deep(value, object))