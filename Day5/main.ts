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