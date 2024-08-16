import { FC, ReactElement, useState } from "react";
import {
    Box,
    Typography,
    Stack,
    LinearProgress,
    Button,
    Alert,
    AlertTitle,
} from "@mui/material";
import { TaskTitleField } from "./_taskTitleField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskDateField } from "./_taskDateField";
import { TaskSelectField } from "./_taskSelectField";
import { Priority } from "./enums/Priority";
import { Status } from "./enums/Status";
import { useMutation } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateTask } from "../taskArea/interfaces/ICreateTask";
export const CreateTaskForm: FC = (): ReactElement => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(
        undefined
    );
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);
    const createTaskMutation = useMutation({
        mutationFn: (data:ICreateTask) => {
        return sendApiRequest("http://localhost:3000/tasks", "POST", data);
        },
      });
    function createTaskHandler() {
        console.log("Creating a task");
        console.log(date?.toISOString());
        if(!title || !description || !date){
            return;
        }
        const task:ICreateTask={
            title:title,
            description:description,
            date:date.toString(),
            status:status,
            priority:priority
        }
        console.log(task);
        createTaskMutation.mutate(task);
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >
            <Alert
                severity="success"
                sx={{ width: "100%", marginBottom: "16px" }}
            >
                <AlertTitle>Success</AlertTitle>
                The task has been created sucessfully
            </Alert>
            <Typography mb={2} component="h2" variant="h6">
                Create A Task
            </Typography>
            <Stack sx={{ width: "100%" }} spacing={2}>
                <TaskTitleField
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    disabled={false}
                />
                <TaskDescriptionField
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    disabled={false}
                />
                <TaskDateField
                    value={date}
                    onChange={(date) => {
                        setDate(date);
                    }}
                />
                <Stack sx={{ width: "100%" }} direction="row" spacing={2}>
                    <TaskSelectField
                        label="Status"
                        name="status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value as string);
                        }}
                        items={[
                            {
                                value: Status.todo,
                                label: Status.todo.toUpperCase(),
                            },
                            {
                                value: Status.inProgress,
                                label: Status.inProgress.toUpperCase(),
                            },
                        ]}
                    />
                    <TaskSelectField
                        label="Priority"
                        name="priority"
                        value={priority}
                        onChange={(e) => {
                            setPriority(e.target.value as string);
                        }}
                        items={[
                            {
                                value: Priority.low,
                                label: Priority.low,
                            },
                            {
                                value: Priority.normal,
                                label: Priority.normal,
                            },
                            {
                                value: Priority.high,
                                label: Priority.high,
                            },
                        ]}
                    />
                </Stack>
                <LinearProgress />
                <Button variant="contained" size="large" fullWidth onClick={createTaskHandler}>
                    Create A Task
                </Button>
            </Stack>
        </Box>
    );
};
