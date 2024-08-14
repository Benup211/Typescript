import { FC, ReactElement } from "react";
import { Avatar, Typography, Box } from "@mui/material";
import { ITaskCounter } from "./interfaces/ITaskCounter";
import { Status } from "../createTaskForm/enums/Status";
import {EmitCorrectBorderColor} from './helpers/emitCorrectBorderColor';
import { EmitCorrectLabel } from "./helpers/emitCorrectLabel";
export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
    const {
        count=0,
        status=Status.inProgress
    }=props
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
        sx={{
            backgroundColor:'transparent',
            border:'5px solid',
            width:'8rem',
            height:'8rem',
            marginBottom:'1rem',
            borderColor:`${EmitCorrectBorderColor(status,)}`
        }}>
          <Typography color="#FFFFFF" variant="h4" >{count}</Typography>
        </Avatar>
        <Typography color="#FFFFFF" fontWeight="bold" fontSize="1rem" variant="h5">{EmitCorrectLabel(status)}</Typography>
      </Box>
    </>
  );
};
