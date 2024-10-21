
// This approach achieves inheritance through delegation and composition
// while adhering to the principles of functional programming.

function Bank(username, role, dob = new Date()) {
    let age = calculateAge();

    function calculateAge() {
        let currentYear = new Date().getFullYear();
        return currentYear - dob.getFullYear();
    }

    return {
        getUserInfo: function () {
            return `${username}, is the current user, with role: ${role}, and age ${age}`;
        },
        setDOB: function (newDob) {
            dob = new Date(newDob);
            age = calculateAge();
        },
        getAge: function () {
            return age;
        },
        getRole: function () {
            return role;
        },
        setRole: function (newRole) {
            role = newRole;
        }
    };
}

function User(name, role, dob, balance) {
    let bank = Bank(name, role, dob);
    let userBalance = balance;

    return {
        ...bank, // Inherit methods from Bank
        getBalance: function () {
            return userBalance;
        },
        setBalance: function (amount) {
            userBalance = amount;
        }
    };
}

// Usage
let user1 = Bank('sneha', 'SDE');
console.log(user1.getUserInfo());
user1.setDOB(new Date('09/13/2020'));
console.log(user1.getUserInfo());

let user2 = User('Vinay', 'Chemist', new Date('09/13/2020'), 30000);
console.log(user2.getBalance());
user2.setDOB(new Date('09/13/2017'));
console.log(user2.getUserInfo());
user2.setRole('Scientist');
console.log(user2.getUserInfo());
console.log(user2.getAge());


// Bank as a Function: The Bank function now returns an object containing the methods
// for interacting with user information.It includes:

// getUserInfo()
// setDOB(newDob)
// getAge()
// setRole(newRole)
// User as a Function: The User function extends the Bank function by using object composition.
// The User function calls Bank and augments it with additional methods like:

// getBalance()
// setBalance(amount)
// Encapsulation: Private data like age and balance is encapsulated using closures rather than private fields.

// Method Delegation: The User function uses the spread operator ...bank to delegate methods
// from the Bank function and add additional functionality for balance.