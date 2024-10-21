function EmployeeName() {
    // this.names = []; // Now, each instance will have its own array
}

EmployeeName.prototype = {
    names: [],
    shownames: function () {
        return this.names;
    }
}

let e1 = new EmployeeName();
e1.names.push('foo');
console.log(e1.shownames()); // ["foo"]

let e2 = new EmployeeName();
e2.names.push('bar');
console.log(e2.shownames()); // ["foo","bar"]



// In JavaScript, when you assign EmployeeName.prototype = {}, you're essentially setting the properties on the prototype of the EmployeeName constructor.
// This means that all instances of EmployeeName(i.e., e1 and e2) will share the same names array because it is defined on the prototype,
// and prototypes are shared across instances.