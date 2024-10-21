class Animal {
}
class Dog extends Animal {
}

let aussie = new Dog()
let generic = new Animal()

console.log('aussie => Dog ----', aussie.__proto__, Dog.prototype, aussie.__proto__ === Dog.prototype)
console.log('aussie => Dog =>Animal----', aussie.__proto__.__proto__, Animal.prototype, aussie.__proto__.__proto__ === Animal.prototype)

console.log('Animal vs Function', Animal.__proto__, Animal.prototype, Function.prototype, Animal.__proto__ === Function.prototype, Animal.__proto__ === Animal.prototype)


console.log('generic =>Animal----', generic.__proto__, Animal.prototype, generic.__proto__ === Animal.prototype)

console.log('Animal vs Dog', Dog.__proto__, Animal, Dog.__proto__ === Animal)