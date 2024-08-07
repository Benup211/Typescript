"use strict";
class User {
    static userIncrement() {
        User.userCount++;
    }
    constructor(name, email) {
        this.name = name;
        this.email = email;
        console.log("User Constructor");
    }
    set age(value) {
        this._age = value;
    }
    get age() {
        return this._age || 0;
    }
    getName() {
        return `Name is ${this.name}`;
    }
}
User.userCount = 0;
(() => {
    console.log("Static is initialized");
})();
class Admin extends User {
    constructor(name, isAdmin, email) {
        super(name, email);
        this.isAdmin = isAdmin;
        console.log("Admin Constructor");
    }
    getName() {
        return `Name is ${this.name} from admin`;
    }
}
const adminUser = new Admin("Benup", true, "Benup211@gmail.com");
User.userIncrement();
adminUser.age = 22;
console.log(adminUser.age);
console.log(adminUser.getName());
console.log(User.userCount);
