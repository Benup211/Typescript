# Typescript

## Defining Types
- Using interface
    ```typescript
        interface User{
            name:string;
            id:number;
        }
        const user:User={
            name:"Benup",
            id:"11"
        }
    ```
- Installing typescript
    ```cmd
        npm install -g typescript
    ```
    
    - Using typescript and compiling
    ```cmd
        tsc --init
        tsc *.ts
    ```
    - Union
    ```typescript
        const abc:string|number="hello";
        console.log(abc);
    ```