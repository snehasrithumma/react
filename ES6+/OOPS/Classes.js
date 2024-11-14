class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log(`${this.name} makes sound`)
    }
}

class Dog extends Animal {
    #vaccinated = false; // private
    _waterAmount = 0; //protected
    _dob;
    constructor(name, age, breed) {
        super(name, age)
        this.breed = breed;
        this.sum = 0;
        this.count = 0;
    }

    get Breed() {
        return this.breed
    }
    set Breed(breed) {
        this.breed = breed
    }
    speak() {
        console.log(`${this.name} the ${this.breed} barks`)
    }
    set Vaccinated(val) {
        this.#vaccinated = val;
    }
    get Vaccinated() {
        return this.#vaccinated ? `${this.name} is Vaccinated` : `${this.name} is not Vaccinated`;
    }

    set dob(date) {
        this._dob = date;
    }

    get dob() {
        return this._dob
    }

    get waterAmount() {
        return this._waterAmount;
    }
    set waterAmount(value) {

        this._waterAmount = value;
    }
    add(array) {
        array.forEach((entry) => {
            this.sum += entry;
            this.count++;
        });
    }
    addArray(array) {
        array.forEach(function Count(entry) {
            this.sum += entry;
            this.count++;
        }, this);
    }
}

let animal = new Animal('dog', 8)
animal.speak()
let dog = new Dog('Sasha', 1, 'Aussie')
dog.speak()
dog.Breed = 'Australian Shepard'
dog.speak()
console.log(dog.Vaccinated)
dog.Vaccinated = true
console.log(dog.Vaccinated)
console.log(dog.dob)
dog.dob = new Date('08/01/2023')
console.log(dog.dob)
console.log(dog.waterAmount)
dog.waterAmount = 100
console.log(dog.waterAmount)
dog.add([2, 3, 8, 7])
console.log(dog.sum, dog.count)
dog.addArray([100, 1, 90, 9])
console.log(dog.sum, dog.count)

// Protected fields start with _.
// That’s a well - known convention, not enforced at the language level.
// Programmers should only access a field starting with _ from its class and classes inheriting from it.

// Private fields start with #.
// JavaScript makes sure we can only access those from inside the class.