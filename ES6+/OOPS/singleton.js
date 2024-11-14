class User {
    static instance = null
    constructor(name) {
        if (User.instance) {
            return User.instance
        }
        this.name = name
        User.instance = this
    }
}

let user1 = new User('sneha')
let user2 = new User('Vinay')
console.log(user1.name, user2.name)



class Car {
    static instance = null;
    constructor(name, make) {
        if (Car.instance) {
            return Car.instance;
        }
        this.name = name;
        this.make = make;
        Car.instance = this;
    }
}

let camry = new Car('camry', 'toyota')
let modely = new Car('Model Y', 'Tesla')

console.log(camry, modely)