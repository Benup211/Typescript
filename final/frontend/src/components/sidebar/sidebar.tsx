import {FC,ReactElement} from "react";
import { Grid } from "@mui/material";
import { Profile } from "../profile/profile";
import { CreateTaskForm } from "../createTaskForm/createTaskForm";
export const Sidebar:FC = ():ReactElement => {
    return(
        <Grid item md={4} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "background.paper",
            height: "100vh",
            width: "100%",
            position: "fixed",
            right:0,
            top: 0,
        }}>
            <Profile name="benup"/>
            <CreateTaskForm/>
        </Grid>
    )
};