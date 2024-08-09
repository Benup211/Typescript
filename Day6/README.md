# Prototypes and Objects

- Prototype
    ```javascript
        function User(name,email){
            this.name=name;
            this.email=email;
        }
        User.prototype.display=function(){
            console.log(`${this.name} ${this.email}`);
        };
        const user=new User("benup","benup211@gmail.com")
        console.log(user);
    ```
- Inheriting Properties of User
    ```javascript
        function User(name,email){
            this.name=name;
            this.email=email;
        }
        User.prototype.display=function(){
            console.log(`${this.name} ${this.email}`);
        };
        function Admin(name,email){
            User.apply(this,[name,email]);
        }
        Admin.prototype=Object.create(User.prototype)
        const admin=new Admin("benup","benup211@gmail.com")
        admin.display();
    ```
- Decorators in Typescript
    - Can only be used in class and its member
    - only fierd once when class is initialized in runtime
    ```typescript
        function myFirstDecorator(target:Function){
            console.log(target);
        }
        @myFirstDecorator
        class Car{
            constructor(private _brand:string){}

            getBrand(){
                return this._brand;
            }
        }
        const car=new Car("BMW");      
    ``` 
- Decorator Factories
    - can pass argument to the decorators
    ```typescript
        function myFirstDecorator(name:string){
            return function(target:Function){
                console.log(`${name} class is initialized`)
                console.log(target)
            }
        }
        @myFirstDecorator("Car Class")
        class Car{
            constructor(private _brand:string){}

            getBrand(){
                return this._brand;
            }
        }
    ```
- Interfaces for Prototypes
    - Accessing protoype values
    ```typescript
        function myFirstDecorator(name:string){
            return function(target:Function){
                console.log(`${name} class is initialized`)
                target.prototype.name=name;
                console.log(target)
            }
        }
        interface CarValues{
            name?:string,
            _brand:string
        }
        @myFirstDecorator("Car Class")
        class Car implements CarValues{
            constructor(public _brand:string){}

            getBrand(){
                return this._brand;
            }
        }
        const car:CarValues=new Car("BMW");
        console.log(car)
        console.log(car.name);
    ```
- Adding and Accessing Function in the prototype
    - Require args of target:Function
    ```typescript
        function myFirstDecorator(name:string){
            return function(target:Function){
                console.log(`${name} class is initialized`)
                target.prototype.name=name;
                target.prototype.getName=()=>{
                    console.log(`name is ${target.prototype.name}`)
                }
                console.log(target)
            }
        }
        interface CarValues{
            name?:string,
            _brand:string,
            getName?:()=>void
        }
        @myFirstDecorator("Car Class")
        class Car implements CarValues{
            constructor(public _brand:string){}

            getBrand(){
                return this._brand;
            }
        }
        const car:CarValues=new Car("BMW");
        console.log(car)
        console.log(car.name)
        car.getName?car.getName():console.log("No getName method")
    ```
- Decorators in the class methods
    - Require prototype:Object,methodName:string,descriptor:PropertyDescriptor
    ```typescript
            function MethodDecorator(prototype:Object,methodName:string,descriptor:PropertyDescriptor){
            console.log("prototype:",prototype)
            console.log("method name:",methodName)
            console.log("descriptor:",descriptor)
        }
        interface CarValues{
            name?:string,
            _brand:string,
            getName?:()=>void
        }
        class Car implements CarValues{
            constructor(public _brand:string){}
            @MethodDecorator
            getBrand(){
                return this._brand;
            }
        }
    ```
- Decorators in the static method of class
    - Require args of constructor:Object,methodName:string,descriptor:PropertyDescriptor
    ```typescript
        function StaticMethodDecorator(constructor:Object,methodName:string,descriptor:PropertyDescriptor){
            console.log("constructor:",constructor)
            console.log("method name:",methodName)
            console.log("descriptor:",descriptor)
        }
        interface CarValues{
            name?:string,
            _brand:string,
            getName?:()=>void
        }
        class Car implements CarValues{
            constructor(public _brand:string){}
            getBrand(){
                return this._brand;
            }
            @StaticMethodDecorator
            static count(){
                console.log("Static count")
            }
        }
    ```
- Decorators in the function Parameter
    - Require args of prototype:Object,methodName:string,index:number
    ```typescript
        function ParameterDecorator(prototype:Object,methodName:string,index:number){
            console.log("prototype:",prototype)
            console.log("method name:",methodName)
            console.log("index:",index)
        }
        interface CarValues{
            name?:string,
            _brand:string,
            getName?:()=>void
        }
        class Car implements CarValues{
            constructor( public _brand:string){}
            getBrand(@ParameterDecorator msg:string){
                return this._brand;
            }
            static count(){
                console.log("Static count")
            }
        }
    ```
- Descriptor in the class Property
    - Require args of prototype:Object,propertyName:string
    ```typescript
        function PropertyDecorator(prototype:Object,propertyName:string){
            console.log("prototype:",prototype)
            console.log("method name:",propertyName)
        }
        interface CarValues{
            name?:string,
            _brand:string,
            getName?:()=>void
        }
        class Car implements CarValues{
            @PropertyDecorator
            public _brand:string
            constructor(brand:string){
                this._brand=brand;
            }
            getBrand(){
                return this._brand;
            }
            static count(){
                console.log("Static count")
            }
        }
    ```
- Descriptor in the Getter and setter
    - Require args of prototype:Object,methodName:string,descriptor:PropertyDescriptor
    ```typescript
        function GetterSetterDescriptor(prototype:Object,methodName:string,descriptor:PropertyDescriptor){
            console.log("prototype:",prototype)
            console.log("method name:",methodName)
            console.log("descriptor:",descriptor)
        }
        interface CarValues{
            name?:string,
            _brand:string,
            getName?:()=>void
        }
        class Car implements CarValues{
            public _brand:string
            constructor(brand:string){
                this._brand=brand;
            }
            getBrand(){
                return this._brand;
            }
            static count(){
                console.log("Static count")
            }
            @GetterSetterDescriptor
            get brand(){
                return this._brand;
            }
        }
    ```
- Multiple Decorators and Returning Value from the decorator
    ```typescript
        type MapLocation={
            lat:number,
            long:number
        }
        function Dec1(target:Function){
            console.log("Decorator 1");
        }
        function AddLocation(lat:number,long:number){
            return <T extends {new(...args:any[]):{}}>(ClassConstructor:T)=>{
                return class extends ClassConstructor{
                    public mapLocation:MapLocation;
                    constructor(...args:any[]){
                        super(args);
                        this.mapLocation={lat,long};
                    }
                }
            }
        }

        @AddLocation(1.3,1.2)
        @Dec1
        class LocationMap{
            constructor(public name:string){}
        }
        console.log(LocationMap)
        const map1=new LocationMap("lalitpur");
        console.log(map1);
    ```
- Composition and Evaluation of Decorators
    ```typescript
        function First(){
            console.log("First Evaluation");
            return function(target:Object,methodName:string,descriptor:PropertyDescriptor){
                console.log("First Returned");
            };
        }
        function Second(){
            console.log("Second Evaluation");
            return function(target:Object,methodName:string,descriptor:PropertyDescriptor){
                console.log("Second Returned");
            };
        }
        class Sample{
            @First()
            @Second()
            method(){
            }
        }
    ```








