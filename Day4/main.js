"use strict";
const filter = (array, predicate) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
};
let numberArray = [1, 2, 3, 4, 5];
let predicateOfNumber = (item) => {
    if (item > 2) {
        return true;
    }
    return false;
};
console.log(filter(numberArray, predicateOfNumber));
