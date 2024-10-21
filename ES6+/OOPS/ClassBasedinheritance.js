class Bank {
    #age;
    constructor(username, role, dob = new Date()) {
        this.username = username;
        this.role = role;
        this.dob = dob;
        this.#age = this.calcultaeAge();
    }
    calcultaeAge() {
        let currentYear = new Date().getFullYear();
        return currentYear - this.dob.getFullYear();
    }
    get userInfo() {
        return `${this.username}, is the current user, with role: ${this.role}, and age ${this.#age}`
    }

    /**
     * @param {Date} dob
     */
    set userDOB(dob) {
        this.dob = new Date(dob)
        this.#age = this.calcultaeAge();
    }
    get Age() {
        return this.#age
    }
}

let user1 = new Bank('sneha', 'SDE')
console.log(user1.userInfo)
user1.userDOB = new Date('09/13/2020')
console.log(user1.userInfo)

class User extends Bank {
    #balance;
    constructor(name, role, dob, balance) {
        super(name, role, dob);
        this.#balance = balance;
    }
    get balance() {
        return this.#balance
    }
    set balance(amount) {
        this.#balance = amount
    }
    /**
     * @param {string} age
     */
    set Role(age) {
        this.role = age
    }
}

let user2 = new User('Vinay', 'Chemist', new Date('09/13/2020'), 30000)
console.log(user2.balance)
user2.userDOB = new Date('09/13/2017')
console.log(user2.userInfo)
user2.Role = 'Scientist'
console.log(user2.userInfo)
console.log(user2.Age)
console.log(user2 instanceof User)
console.log(User.prototype.__proto__ === Bank.prototype)
console.log(User.prototype instanceof Bank)