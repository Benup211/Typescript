import { FC, ReactElement } from "react";
import { Box } from "@mui/material";
import {TaskHeader} from './_taskHeader'
import { TaskDescription } from "./_taskDescription";
import {TaskFooter} from "./_taskFooter";
import {ITask} from './interfaces/ITask';
import { Status } from "../createTaskForm/enums/Status";
import { Priority } from "../createTaskForm/enums/Priority";
import { RenderPriorityBorderColor } from "./helpers/renderPriorityBorderColor";
export const Task: FC<ITask> = (props): ReactElement => {
  const {
    title="This is a sample title",
    date=new Date(),
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    onStatusChange=(e)=>console.log(e),
    onClick=(e)=>console.log(e),
    status=Status.completed,
    priority=Priority.low,
    id
  }=props
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        width="100%"
        flexDirection="column"
        mb={2}
        p={4}
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: "0.5rem",
          border: "1px solid",
          borderColor:`${RenderPriorityBorderColor(priority)}`,
        }}
      >
        <TaskHeader title={title} date={new Date(date)}/>
        <TaskDescription description={description}/>
        <TaskFooter id={id} status={status} onStatusChange={onStatusChange} onClick={onClick}/>
      </Box>
    </>
  );
};
