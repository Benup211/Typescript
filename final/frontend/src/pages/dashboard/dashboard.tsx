import { Grid } from "@mui/material";
import {FC,ReactElement} from "react";
import {Sidebar} from '../../components/sidebar/sidebar';
import { TaskArea } from "../../components/taskArea/taskArea";
export const Dashboard:FC = ():ReactElement => {
    return(
        <Grid container minHeight="100vh" p={0} m={0}>
            <TaskArea/>
            <Sidebar/>
        </Grid>
    )
};