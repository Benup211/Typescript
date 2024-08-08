# Classes in Typescript

- Class:Access modifier,constructor,inheritance,setter,getter,static
    ```typescript
        class User{
            private _age?:number;
            static userCount=0;
            static userIncrement(){
                User.userCount++;
            }
            static{
                console.log("Static is initialized");
            }
            constructor(protected name:string,protected email?:string){
                console.log("User Constructor");
            }
            public set age(value:number){
                this._age=value;
            }
            public get age(){
                return this._age||0;
            }
            public getName(){
                return `Name is ${this.name}`;
            }
        }
        class Admin extends User{
            constructor(name:string,private isAdmin:boolean,email?:string){
                super(name,email);
                console.log("Admin Constructor");
            }
            public getName(): string {
                return `Name is ${this.name} from admin`;
            }
        } 

        const adminUser=new Admin("Benup",true,"Benup211@gmail.com");
        User.userIncrement();
        adminUser.age=22;
        console.log(adminUser.age);
        console.log(adminUser.getName());
        console.log(User.userCount);
    ```
- Class with Generic
    ```typescript
        class Box<T>{
            private _value:T;
            constructor(value:T){
                this._value=value;
            }
            get value(){
                return this._value;
            }
            set value(value:T){
                this._value=value;
            }
        }
        const box1=new Box<string>("Hello world");
        console.log(box1.value);
        box1.value="Hello world!!"
        console.log(box1.value);
    ```
- Generic Use Case
    ```typescript
        type identifiable={
            id:number;
        }
        class Repository<T extends identifiable>{
            private items:T[]=[];

            add(item:T){
                this.items.push(item);
            }

            listAll():T[]{
                return this.items;
            }

            deleteById(id:number):(T[]|undefined){
                this.items=this.items.filter((item)=>item.id!=id);
                return this.items;
            }

            findById(id:number):(T|undefined){
                return this.items.find((item)=>item.id==id);
            }
        }
        type User={
            id:number;
            name:string;
            email:string;
        }

        const userRepository=new Repository<User>();
        userRepository.add({
            id:1,
            name:"Benup",
            email:"benup211@gmail.com"
        })
        userRepository.add({
            id:2,
            name:"Benup2",
            email:"benup411@gmail.com"
        })
        console.log(userRepository.listAll());//[{},{}]
        console.log(userRepository.findById(3));//undefined
        console.log(userRepository.deleteById(2));//[{},{}]remainings or all
    ```
- Classes with Mixins
    ```typescript
        function TimeStamp<T extends new(...args:any[])=>{}>(base:T){
            return class extends base{
                protected timestamp:Date=new Date();
                getTimeStamp(){
                    return this.timestamp;
                }
            }
        }
        class User{
            constructor(public name:string){}
        }
        class UserMixin extends TimeStamp(User){
            constructor(name:string,public age:number){
                super(name);
            }
            displayInfo(){
                return `Name:${this.name} age:${this.age} and timestamp:${this.getTimeStamp()}`;
            }
        }
        const usermixin=new UserMixin("Benup",22);
        console.log(usermixin.displayInfo());
    ```
# Abstract Classes and Interfaces

- Introduction
    ```typescript
        type Holiday={
            date:Date;
            reson:string;
        }[];
        abstract class Department{
            protected abstract holiday:Holiday;
            protected constructor(protected name:string){}
        }
        class ITDepartment extends Department{
            protected holiday: Holiday=[];
        }
    ```
- Shared Methods in Abstract class
    ```typescript
        type Holiday={
            date:Date;
            reason:string;
        }[];
        abstract class Department{
            protected abstract holiday:Holiday;
            protected constructor(protected name:string){}

            public addHoliday(holiday:Holiday){
                if(Array.isArray(holiday)){
                    for(const h of holiday){
                        this.holiday.push(h);
                    }
                }
            }
            public abstract printHoliday():void;
        }
        class ITDepartment extends Department{
            protected holiday: Holiday=[];
            constructor(){
                super("ITDepartment");
            }
            public printHoliday(){
                if(this.holiday.length==0){
                    console.log("There is no holidays")
                }
                console.log(`Here is the list of holiday in ${this.name}`)
                this.holiday.forEach((h:{date:Date,reason:string},index:number)=>{
                    console.log(`${index+1}\t Holiday Reason:${h.reason} \t Holiday Date:${h.date}`);
                })
            }
        }
        const it=new ITDepartment();
        it.addHoliday([{
            date:new Date(),
            reason:"lorem"
        },{
            date:new Date(),
            reason:"qwerty"
        }]);
        it.printHoliday()
    ```
- Interface implementation in class
    ```typescript
        interface User{
            name:string;
            email:string;
            login():void;
        }
        class Admin implements User{
            constructor(public name:string,public email:string,private adminLevel:number){}
            public login():void{
                console.log("Admin is logged in");
            }
        }
        class Customer implements User{
            constructor(public name:string,public email:string){}
            public login(): void {
                console.log("Customer is logged in")
            }
        }

        class Auth{
            public static Login(user:User){
                user.login();
            }
        }
        const admin1=new Admin("Benup","Benup211@gmail.com",1)
        const customer1=new Customer("Ghimire","Ghimire@gmail.com")
        Auth.Login(admin1)//Admin is logged in
        Auth.Login(customer1)//Customer is logged in
    ```
- Inheriting from multiple interface
    ```typescript
        interface User{
            name:string;
            email:string;
        }
        enum RoleType{
            ADMIN="admin",
            USER="user",
            GUEST="guest"
        }
        interface Role{
            role:RoleType
        }
        enum PermissionType{
            READ="read",
            WRITE="write",
            EXECUTE="execute"
        }
        interface Permission{
            havePermission:PermissionType[]
        }
        interface AdminInterface extends User,Role,Permission{
            adminLevel:number;
        }
        const superUser:AdminInterface={
            name:"Benup",
            email:"Benup211@gmail.com",
            role:RoleType.ADMIN,
            havePermission:[PermissionType.READ,PermissionType.WRITE],
            adminLevel:1
        }
        console.log(superUser);//{name: 'Benup',email: 'Benup211@gmail.com',role: 'admin',havePermission: [ 'read', 'write' ],adminLevel: 1}
    ```
- Using Multiple Types as Generic
    ```typescript
        enum AutoMobileType{
            CAR="car",
            BIKE="motorbike",
            TRUCK="truck"
        }
        enum AutoMobileBrand{
            BMW="bmw",
            PAGINI="pagini",
            TOYOTA="toyota"
        }
        enum AutoMobileColor{
            RED="red",
            GREEN="green",
            PURPLE="purple"
        }
        interface AutoMobile<Type,Brand,Color>{
            type:Type,
            brand:Brand,
            color:Color[],
            description:string
        }
        const autoMobile1:AutoMobile<AutoMobileType,AutoMobileBrand,AutoMobileColor>={
            type:AutoMobileType.CAR,
            brand:AutoMobileBrand.PAGINI,
            color:[AutoMobileColor.PURPLE,AutoMobileColor.GREEN],
            description:"This is a description"
        }
        console.log(autoMobile1);
    ```
- Using Interfaces as Classes
    ```typescript
        enum AutoMobileType{
            CAR="car",
            BIKE="motorbike",
            TRUCK="truck"
        }
        enum AutoMobileBrand{
            BMW="bmw",
            PAGINI="pagini",
            TOYOTA="toyota"
        }
        enum AutoMobileColor{
            RED="red",
            GREEN="green",
            PURPLE="purple"
        }
        interface AutoMobile<Type,Brand,Color>{
            type:Type,
            brand:Brand,
            color:Color[],
            description:string
        }
        class Car implements AutoMobile<AutoMobileType,AutoMobileBrand,AutoMobileColor>{
            constructor(public type:AutoMobileType,public brand:AutoMobileBrand,public color:AutoMobileColor[],public description:string){}
        }
        const car1=new Car(AutoMobileType.CAR,AutoMobileBrand.BMW,[AutoMobileColor.GREEN,AutoMobileColor.PURPLE],"This is a BMW");
        console.log(car1);
    ```
