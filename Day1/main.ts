interface User {
    name:string;
    age:number
};

const user:User = {
    name:"John",
    age:20
};

class UserAccount{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name=name;
        this.age=age;
    }
    
}
const classUser:User=new UserAccount("Benup",20);
const hello:string|number="123";
console.log(hello);
type CustomNumber=number;
type ConditionNumber=CustomNumber extends number ? string:number
const cNum:ConditionNumber="hwllo";
console.log(cNum);
console.log(classUser.name);