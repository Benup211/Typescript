import { ITaskApi } from "../interfaces/ITaskApi";
import { Status } from "../../createTaskForm/enums/Status";
export const countTask=(
    tasks:ITaskApi[],
    status:`${Status}`
):number=>{
    if(!Array.isArray(tasks)){
        return 0;
    }
    const totalTask=tasks.filter((task)=>{
        if(task.status===status) return true;
    })
    return totalTask.length;
};