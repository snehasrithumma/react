// combine constructor functions with prototype-based inheritance


function Bank(username, role, dob = new Date()) {
    this.username = username;
    this.role = role;
    this.dob = dob;
    this.age = this.calculateAge();
}

Bank.prototype.calculateAge = function () {
    let currentYear = new Date().getFullYear();
    return currentYear - this.dob.getFullYear();
}

Bank.prototype.getUserInfo = function () {
    return `${this.username}, is the current user, with role: ${this.role}, and age ${this.age}`;
}

Bank.prototype.setDOB = function (newDob) {
    this.dob = new Date(newDob);
    this.age = this.calculateAge();
}

Bank.prototype.getAge = function () {
    return this.age;
}

Bank.prototype.getRole = function () {
    return this.role;
}

Bank.prototype.setRole = function (newRole) {
    this.role = newRole;
}

function User(username, role, dob, balance) {
    Bank.call(this, username, role, dob); // Inherit from Bank
    this.balance = balance;
}

// User.prototype = Object.create(Bank.prototype); // Inherit methods from Bank
// User.prototype.constructor = User; // Set the child object's prototype to be the parent's prototype.
// or use bellow
Object.setPrototypeOf(User.prototype, Bank.prototype);

User.prototype.getBalance = function () {
    return this.balance;
}

User.prototype.setBalance = function (amount) {
    this.balance = amount;
}

// Usage
let user1 = new Bank('sneha', 'SDE');
console.log(user1.getUserInfo()); // sneha, is the current user, with role: SDE, and age X
user1.setDOB(new Date('09/13/2020'));
console.log(user1.getUserInfo()); // sneha, is the current user, with role: SDE, and age 3

let user2 = new User('Vinay', 'Chemist', new Date('09/13/2020'), 30000);
console.log(user2.getBalance()); // 30000
user2.setDOB(new Date('09/13/2017'));
console.log(user2.getUserInfo()); // Vinay, is the current user, with role: Chemist, and age 6
user2.setRole('Scientist');
console.log(user2.getUserInfo()); // Vinay, is the current user, with role: Scientist, and age 6
console.log(user2.getAge()); // 6


// Prototype Chain Setup:

// User.prototype = Object.create(Bank.prototype) ensures that User inherits methods from Bank.
// We then set the constructor of User properly by assigning User.prototype.constructor = User.
// Calling the Parent Constructor:

// Bank.call(this, username, role, dob) is used inside the User constructor to inherit properties from Bank.
// New Methods for User:

// getBalance() and setBalance() are added to the User prototype to handle the balance property specific to User.
// Now, User objects inherit both the properties and methods from Bank(through the prototype chain)
// and also have their own unique methods.