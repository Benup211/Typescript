import { FC, ReactElement,useContext,useEffect } from "react";
import { Grid, Box, Alert, LinearProgress } from "@mui/material";
import { format } from "date-fns";
import { TaskCounter } from "../taskCounter/taskCounter";
import { Status } from "../createTaskForm/enums/Status";
import PropTypes from "prop-types";
import { Task } from "../task/task";
import { useQuery,useMutation } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ITaskApi } from "./interfaces/ITaskApi";
import { IUpdateTask } from "./interfaces/IUpdateTask";
import {countTask} from './helpers/countTask';
import {TaskStatusChangedContext} from '../context'
export const TaskArea: FC = (): ReactElement => {
    const taskUpdatedContext=useContext(TaskStatusChangedContext);
    const { error, isLoading, data,refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => {
            return sendApiRequest<ITaskApi[]>("http://localhost:3000/tasks", "GET");
        },
    });
    const updateTaskMutation=useMutation({
      mutationFn:(data:IUpdateTask)=>{
        return sendApiRequest('http://localhost:3000/tasks',"PUT",data);
      }
    });
    
    function onStatusChangeHandler(e:React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>,id:string){
      const target = e.target as HTMLInputElement;
      updateTaskMutation.mutate({
        id,
        status: target.checked ? Status.inProgress : Status.todo
      })
    }
    function markCompletehandler(e:React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLAnchorElement>,id:string){
        updateTaskMutation.mutate({
            id,
            status:Status.completed
          })
    }
    useEffect(()=>{
        refetch();
    },[taskUpdatedContext.updated])
    useEffect(()=>{
        if(updateTaskMutation.isSuccess){
            taskUpdatedContext.toggle();
        }
    },[updateTaskMutation.isSuccess])
    return (
        <Grid item md={8} px={4}>
            <Box mb={8} px={4}>
                <h2>Status Of Your Tasks As On {format(new Date(), "PPPP")}</h2>
            </Box>
            <Grid container display="flex" justifyContent="center">
                <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    md={10}
                    xs={12}
                    mb={8}
                >
                    <TaskCounter  
                    count={
                        data?countTask(data,Status.todo):undefined
                    }
                    status={Status.todo} />
                    <TaskCounter count={
                        data?countTask(data,Status.inProgress):undefined
                    }
                    status={Status.inProgress} />
                    <TaskCounter count={
                        data?countTask(data,Status.completed):undefined
                    } status={Status.completed} />
                </Grid>
                <Grid item display="flex" flexDirection="column" xs={10} md={8}>
                    
                    {error && (
                        <Alert severity="error">
                            There was a error fetching your task
                        </Alert>
                    )}
                    {!error && Array.isArray(data) && countTask(data,Status.todo) === 0 && countTask(data,Status.inProgress)===0 && 
                        <Alert severity="warning">You have no pending tasks</Alert>
                    }
                    {isLoading ? (
                        <>
                            <LinearProgress />
                            <Alert severity="info">Fetching your tasks</Alert>
                        </>
                    ):<>
                    {Array.isArray(data) && data.length > 0 && 
                    data.map((task,index)=>{
                      return task.status===Status.todo || task.status===Status.inProgress? (<Task key={index} {...task} onStatusChange={onStatusChangeHandler} onClick={markCompletehandler}/>):(false);
                    })}
                    </>}
                </Grid>
            </Grid>
        </Grid>
    );
};
TaskArea.propTypes = {
    count: PropTypes.number,
    status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
};
