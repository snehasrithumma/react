
class C {
    instanceField = this;
    static staticField = this;
}



const x = [1, 2, 3]
const y = null;
const c = new C();
console.log(c.instanceField === c); // true
console.log(C.staticField); // true
console.log(typeof null) // 'object'
console.log(typeof undefined) // 'undefined'
console.log(typeof NaN) // 'number'
console.log(typeof x) // 'object'
console.log(typeof {}) // 'object'
console.log(Array.isArray(x))
console.log('res', typeof y === 'object' && !Array.isArray(y) && y !== null)
console.log(typeof 1) // 'number'
console.log(typeof 'res') // 'string'
console.log(typeof true) // 'boolean'
console.log(typeof [1.1]) // 'object'
console.log(typeof {}) // 'object'
console.log({} instanceof Object) // true