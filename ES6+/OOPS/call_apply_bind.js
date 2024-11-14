function Person(name, age) {
    this.name = name;
    this.age = age
}

let user1 = new Person('sneha', 20)
console.log(user1.name)

class Persons {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
}
let p1 = new Persons('vk', 28)
console.log(p1.name)


const greet = function (greeting, punc, read) {
    console.log(greeting + ' ' + this.name + ' ' + punc + read)
}

greet.call(p1, 'hello')


greet.apply(p1, ['hello', '!', 'ken'])