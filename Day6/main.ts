function First(){
    console.log("First Evaluation");
    return function(target:Object,methodName:string,descriptor:PropertyDescriptor){
        console.log("First Returned");
    };
}
function Second(){
    console.log("Second Evaluation");
    return function(target:Object,methodName:string,descriptor:PropertyDescriptor){
        console.log("Second Returned");
    };
}
class Sample{
    @First()
    @Second()
    method(){
    }
}