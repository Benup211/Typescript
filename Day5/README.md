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