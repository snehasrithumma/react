
class C {
    instanceField = this;
    static staticField = this;
}



const x = [1, 2, 3]
const y = null;
const c = new C();
console.log(c.instanceField === c); // true
console.log(C.staticField); // true
console.log(typeof null)
console.log(typeof undefined)
console.log(typeof x)
console.log(typeof {})
console.log(Array.isArray(x))
console.log('res', typeof y === 'object' && !Array.isArray(y) && y !== null)
console.log(typeof 1)
console.log(typeof 'res')
console.log(typeof true)
console.log(typeof [1.1])
console.log(typeof {})
console.log({} instanceof Object)