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