import { FC, ReactElement, useState,useEffect } from "react";
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
import { set } from "date-fns";
export const CreateTaskForm: FC = (): ReactElement => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(
        undefined
    );
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);
    const [showSuccess,setShowSuccess] = useState<boolean>(false);
    const [showError,setShowError] = useState<boolean>(false);
    const createTaskMutation = useMutation({
        mutationFn: (data: ICreateTask) => {
            return sendApiRequest("http://localhost:3000/tasks", "POST", data);
        },
    });
    function createTaskHandler() {
        if (!title || !description || !date) {
            return;
        }
        const task: ICreateTask = {
            title: title,
            description: description,
            date: date.toString(),
            status: status,
            priority: priority,
        };
        createTaskMutation.mutate(task);
    }

    useEffect(() => {
        if(createTaskMutation.isSuccess){
            setShowSuccess(true);
        }
        if(createTaskMutation.isError){
            setShowError(true);
        }
        const successTimeout = setTimeout(()=>{
            setShowSuccess(false);
            setShowError(false);
        },5000);

        return ()=>{
            clearTimeout(successTimeout);
        }
    }, [createTaskMutation.isSuccess, createTaskMutation.isError]);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >
            {showSuccess && (
                <Alert
                    severity="success"
                    sx={{ width: "100%", marginBottom: "16px" }}
                >
                    <AlertTitle>Success</AlertTitle>
                    The task has been created sucessfully
                </Alert>
            )}
            {showError && (
                <Alert
                    severity="error"
                    sx={{ width: "100%", marginBottom: "16px" }}
                >
                    <AlertTitle>Failed</AlertTitle>
                    Something went wrong while creating the task
                </Alert>
            )}
            <Typography mb={2} component="h2" variant="h6">
                Create A Task
            </Typography>
            <Stack sx={{ width: "100%" }} spacing={2}>
                <TaskTitleField
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    disabled={createTaskMutation.isPending}
                />
                <TaskDescriptionField
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    disabled={createTaskMutation.isPending}
                />
                <TaskDateField
                    value={date}
                    onChange={(date) => {
                        setDate(date);
                    }}
                    disabled={createTaskMutation.isPending}
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
                        disabled={createTaskMutation.isPending}
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
                        disabled={createTaskMutation.isPending}
                    />
                </Stack>
                {createTaskMutation.isPending && <LinearProgress />}
                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        createTaskMutation.isPending
                    }
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={createTaskHandler}
                >
                    Create A Task
                </Button>
            </Stack>
        </Box>
    );
};
