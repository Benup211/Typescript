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
console.log(filter<number>(numberArray,predicateOfNumber));