type params=<T>(myparams:T)=>T;
const myfun:params=(myparams)=>myparams;
console.log(myfun<string>("Hello"));

type params2<T>=(myparams:T)=>T;
const myfun2:params2<string>=(myparams)=>myparams;
console.log(myfun2("hello function"));