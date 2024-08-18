import { Status } from "../../createTaskForm/enums/Status";
import { Priority } from "../../createTaskForm/enums/Priority";
export interface ITaskApi {
    id:string;
    title:string;
    description:string;
    date:Date;
    status:`${Status}`;
    priority:`${Priority}`;
}