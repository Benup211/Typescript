type check = any extends unknown ? true:false;
type check2= null extends any ? true:false;
type check3=undefined extends unknown ? true:false;
type check4=undefined extends null ? true:false;
type check5= Function extends object ? true:false;