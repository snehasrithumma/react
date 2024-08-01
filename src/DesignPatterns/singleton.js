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