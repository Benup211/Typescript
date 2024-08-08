"use strict";
var AutoMobileType;
(function (AutoMobileType) {
    AutoMobileType["CAR"] = "car";
    AutoMobileType["BIKE"] = "motorbike";
    AutoMobileType["TRUCK"] = "truck";
})(AutoMobileType || (AutoMobileType = {}));
var AutoMobileBrand;
(function (AutoMobileBrand) {
    AutoMobileBrand["BMW"] = "bmw";
    AutoMobileBrand["PAGINI"] = "pagini";
    AutoMobileBrand["TOYOTA"] = "toyota";
})(AutoMobileBrand || (AutoMobileBrand = {}));
var AutoMobileColor;
(function (AutoMobileColor) {
    AutoMobileColor["RED"] = "red";
    AutoMobileColor["GREEN"] = "green";
    AutoMobileColor["PURPLE"] = "purple";
})(AutoMobileColor || (AutoMobileColor = {}));
class Car {
    constructor(type, brand, color, description) {
        this.type = type;
        this.brand = brand;
        this.color = color;
        this.description = description;
    }
}
const car1 = new Car(AutoMobileType.CAR, AutoMobileBrand.BMW, [AutoMobileColor.GREEN, AutoMobileColor.PURPLE], "This is a BMW");
console.log(car1);
