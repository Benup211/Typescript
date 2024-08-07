# Generics in Typescript

- Basic
    ```typescript
        type params=<Type>(myparams:Type)=>Type;
        const myfunc:params=(myparams)=> myparams;
        console.log(myfunc("Hello world"));
    ```
- Generic Function Declarations
    ```typescript
        type params=<T>(myparams:T)=>T;
        const myfun:params=(myparams)=>myparams;
        console.log(myfun<string>("Hello"));

        type params2<T>=(myparams:T)=>T;
        const myfun2:params2<string>=(myparams)=>myparams;
        console.log(myfun2("hello function"));
    ```
- Generic and Constraints with array
    ```typescript
        type hasLength={
        length:number;
        }
        const logger=<T extends hasLength>(item:T):void=>{
            console.log(item.length);
        }
        logger([1,2,3]);
        logger("hello");
        logger({name:"hello world",length:11});
    ```
- Generic with objects
    ```typescript
        type KeyValuePair<K,V>={
            key:K;
            value:V;
        }
        const obj:KeyValuePair<string,number>={
            key:"Hello",
            value:123
        }
        console.log(obj.value);
    ```
- KeyofType Operator
    ```typescript
        type Person={
            name:string;
            age:number;
        }
        type PartialPerson={
            [K in keyof Person]?:Person[K]|null;
        }
        const pp:PartialPerson={
            name:"Benup"
        }
        console.log(pp.name);
    ```
- Generic Default Values
    ```typescript
        type params<T=string>=(items:T)=>T;//default value
        const myfunc:params<number>=(items)=>items;
        console.log(myfunc(1));
    ```
- Polymorphic Function with Generic
    ```typescript
        const filter=<T>(array:T[],predicate:(item:T)=>boolean):T[]=>{
        let result:T[]=[]
        for(let i=0;i<array.length;i++){
            if (predicate(array[i])){
                result.push(array[i]);
            }
            }
            return result
        }
        let numberArray:number[]=[1,2,3,4,5]
        let predicateOfNumber=(item:number):boolean=>{
            if(item>2){
                return true
            }
            return false
        }
        console.log(filter<number>(numberArray,predicateOfNumber));//output[3,4,5]
    ```