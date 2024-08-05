# Working with Objects in Typescript

## Basic
- Object
    ```typescript
        let car:{
            brand:string;
            model:string; 
        }={
            brand:"BMV",
            model:"2022"
        }
    ```
- Nested Object
    ```typescript
        type Author={
            name:string;
            age:number;
            address:string;
        }
        type Book={
            name:string;
            genre:string;
            isbn:number;
            author:Author;
        }
        const book:Book={
            name:"Typescript mastery",
            ..
        }
    ```
- Index Signature
    ```typescript
        [key:string]={
            name:string;
            ..
        }
    ```
- Optional and Readonly
    ```typescript
        category?:string; //does not really require
        readonly type:"human"|"ai"; // once assigned,cannot be changed
    ```
- Union Types in Objects
    ```typescript
        type A1={
                name:string;
                age:number;
                address:string;
            }
            type B1={
                name:string;
                gender:string;
            }
            type A1UnionB1:A1|B1;
            const sample1:A1UnionB1={
                name:"Benup",
                age:22,
                address:"kus",//if address is missed then error occur
                gender:"male",//can be added
        }
    ``` 
- Discriminating Union
    ```typescript
            type A1={
                name:"loading";
            }
            type A2={
                name:"error";
                code:number
            }
            type A1UnionA2=A1|A2;
            function logger(state:A1UnionA2){
                switch(state.name){
                    case "loading":
                        return "loading..";
                    case "error":
                        return `state with error code:${state.code}`;
                }
            }
    ```
- Intersection Type
    ```typescript
        type A1={
            name:string;
            age:number;
        }
        type B2={
            name:string;
            address:string;
        }
        type A1IntersectionB2=A1&B2;//inherit name(common),age and address
    ```



# Arrays and Enum

- Strictly Typing Arrays
    ```typescript
        let a:number[]=[1,2,3];
        let b:Array<string>=["a","b"];
        let c:(number|string)[]=["1","2",3];
        type A1={
            name:string;
            age:number;
        }
        let c:A1[]=[
            {
                name:"Benup",
                age:"22"
            },
            {
                ..
            }
        ];
    ```
- Tuples
    ```typescript
        let a:[number,number,string]=[1,2,"hello"];
        let b:[number,...boolean[],string]=[1,true,false,false,"World"];
    ```
- Readonly Arrays and Tuples
    ```typescript
        type a=readonly number[];
        type b=Readonly<number[]>;
        type c=ReadonlyArray<number>;
        type d=ReadonlyArray<number|string>;
        type e=ReadonlyArray<[number,number,...string[]]>;//tuple
    ```
- Enum
    ```typescript
        enum Roles{
            ADMIN="admin",
            AUTHOR="author"
        }
        type Person={
            name:string;
            age:number;
            roles:Roles
        }
        const person:Person={
            name:"Benup",
            age:22,
            roles:Roles.ADMIN
        }
    ```
- Enum vs Objects
    ```typescript
        enum Roles{
            ADMIN="admin",
            AUTHOR="author"
        }
        console.log(Roles.ADMIN);
        const enum CRoles{
            ADMIN="admin",
            AUTHOR="author"
        }
        console.log(CRoles.ADMIN);
        const ORoles={
            ADMIN:"admin",
            AUTHOR:"author"
        } as const;
        console.log(ORoles.ADMIN);

        //compiled as
        "use strict";
        var Roles;
        (function (Roles) {
            Roles["ADMIN"] = "admin";
            Roles["AUTHOR"] = "author";
        })(Roles || (Roles = {}));
        console.log(Roles.ADMIN);
        console.log("admin" /* CRoles.ADMIN */);
        const ORoles = {
            ADMIN: "admin",
            AUTHOR: "author"
        };
        console.log(ORoles.ADMIN);
    ```
- Computed Enum
    ```typescript
        enum AccessPermissions{
            None=0,
            Read=1,
            Write=2,
            ReadWrite=Read+Write,
            Delete=4,
            All=ReadWrite|Delete
        }
    ```
- Enums as Unions and Types
    ```typescript
        //shapekind can only be circle and square
        enum ShapeKind{
            CIRCLE="circle",
            SQUARE="square"
        }
        type Circle={
            kind:ShapeKind.CIRCLE,
            radius:number
        }
        type Square={
            kind:ShapeKind.SQUARE,
            sideLength:number
        }
        let circle:Circle={
            kind:ShapeKind.CIRCLE,
            radius:3
        }
        console.log(circle.kind)
    ```  

# Function in Typescript

- Declaring Function
    ```typescript
        const myFun=(name:string,age:number):string=>{
            return `Name is ${name} and age is $age{}`;
        }
    ```
- Optional Parameters
    ```typescript
        //optional parameter are declared at last of the parameters
        const myFun=(name:string,age:number,country?:string):string=>{
            if(country){
                return `hello ${name} from ${country}`;
            }
            return `hello ${name}`;
        }
    ```
- Function call signature
    ```typescript
        type Person={
            name:string;
            age:number;
            greet:(greeting:string)=>string;
        }
        const person:Person={
            name:"Benup",
            age:22,
            greet:(greeting)=>{return `${greeting} ${person.name}`};
        }
        console.log(person.greet("Hello"));
    ```
- Anonymous Function
    ```typescript
        const students:string[]=["A","B","C"]
        students.map((student)=>{
            console.log(`hello student ${student}`);
        });
    ```
- Never and Void types
    ```typescript
        //void type
        function hello(msg:string):void{
            console.log(msg);
        }
        function throwError(error:string):never{
            throw new Error(error);
        }
        hello("Hello");
        try{
            throwError("Error404");
        }
        catch(error){
            console.log(error);
        }
    ```
- Async function
    ```typescript
        type User={
            name:string;
            age:number;
        }
        const fetchUser=async():Promise<User>=>{
            const user=await Promise.resolve({name:"Benup",age:22});
            return user;
        }
        console.log(fetchUser().then((user)=>{
            console.log(user);
        }));
    ```
- Rest Parameters and Arguments
    ```typescript
        const multiplyBy=(by:number,...numbers:number[])=>{
            return numbers.map((number)=>by*number);
        }
        console.log(multiplyBy(2,3,4,5));
        const args:[number,number]=[5,8];
        const angle=Math.atan2(...args);
        console.log(angle);
    ```
- Parameter Destructuring
    ```typescript
        type Numbers={
            a:number;
            b:number;
        }
        const sum=({a,b}:Numbers)=>{
            return a+b;
        }
        console.log(sum({a:2,b:3}));
    ```