import { AppDataSource } from "../../index";
import { Task } from "./tasks.entity";
import { instanceToPlain,plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UpdateResult } from "typeorm";

class TaskController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            let allTasks: Task[];
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    date: "ASC",
                },
            });
            allTasks = instanceToPlain(allTasks) as Task[];
            return res.status(200).json(allTasks);
        } catch (_errors) {
            return res.status(500).json("Internal server error");
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        const newTask = new Task();
        newTask.title = req.body.title;
        newTask.description = req.body.description;
        newTask.date = req.body.date;
        newTask.status = req.body.status;
        newTask.priority = req.body.priority;
        try {
            let createdTask: Task = await AppDataSource.getRepository(
                Task
            ).save(newTask);
            createdTask = instanceToPlain(createdTask) as Task;
            return res.status(201).json({ createdTask });
        } catch (error) {
            return res.status(500).json("Internal server error");
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        let task: Task | null;
        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: { id: req.body.id },
            });
        } catch (error) {
            return res.status(500).json("Internal server error");
        }
        if(!task){
            return res.status(404).json({error:'The task with given id does not exist'});
        }
        let updatedTask:UpdateResult;
        try{
            updatedTask=await AppDataSource.getRepository(Task,).update(req.body.id,plainToInstance(Task,{
                status:req.body.status
            }));
            updatedTask=instanceToPlain(updatedTask) as UpdateResult;
            return res.status(200).json(updatedTask);
        }catch(error){
            return res.status(500).json("Internal server error");
        }
    }
}
export const taskController = new TaskController();
