type Numbers={
    a:number;
    b:number;
}
const sum=({a,b}:Numbers)=>{
    return a+b;
}
console.log(sum({a:2,b:3}));
