import { Priority } from "../../createTaskForm/enums/Priority";

export const RenderPriorityBorderColor=(priority:string):string=>{
    switch(priority){
        case Priority.low:
            return 'info.light';
        case Priority.normal:
            return 'grey.900';
        case Priority.high:
            return 'error.light';
        default:
            return 'grey.900';
    }
}