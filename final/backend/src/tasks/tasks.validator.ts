import { body, ValidationChain } from "express-validator";
import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";
Status;
export const createValidator: ValidationChain[] = [
    body("title")
        .not()
        .isEmpty()
        .withMessage("The task title is mandatory")
        .trim()
        .isString()
        .withMessage("Title needs to be in text format"),
    body("date")
        .not()
        .isEmpty()
        .withMessage("The task date is mandatory")
        .isString()
        .withMessage("The date needs to be in valid date format"),
    body("description")
        .trim()
        .isString()
        .withMessage("Description needs to be in text format"),
    body("priority")
        .trim()
        .isIn([Priority.normal, Priority.low, Priority.high])
        .withMessage("Priority can only be normal,high or low"),
    body("status")
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage("Status can only be todo,inProgress,or completed"),
];
export const updateValidator: ValidationChain[] = [
    body("id")
        .not()
        .isEmpty()
        .withMessage("The task id is mandatory")
        .trim()
        .isString()
        .withMessage("Enter valid uuid"),
    body("status")
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage("Status can only be todo,inProgress,or completed"),
];
