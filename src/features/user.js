// ES2015 classes
// Classes provide a more structured and familiar syntax (similar to other programming languages) for creating objects.
//  They define a blueprint and use methods to interact with the object's properties.
//  It can be used when you need to create complex objects with inheritance and encapsulation.
export class User {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    login() {
        console.log('Hello !' + this.name)
    }

    greet = function () {
        console.log(
            `Hello, my name is ${this.name} and I'm ${this.id} years old.`,
        );
    }


}

// Constructor functions
// Constructor functions are used to create reusable blueprints for objects. 
// They define the properties and behaviors shared by all objects of that type.
// You use the new keyword to create instances of the object.
// It can be used when you need to create multiple objects with similar properties and methods.

// However, now that ES2015 classes are readily supported in modern browsers,
// there's little reason to use constructor functions to create objects.
export function Person(name, age) {
    this.name = name;
    this.age = age;
    this.welcome = function () {
        console.log(this.name + ' you are logged in')
    }
    this.logout = () => {
        console.log('please log out ' + this.name)
        return this.name
    }
    // intro(){
    //     console.log('welcome' + this.name)
    // }

}