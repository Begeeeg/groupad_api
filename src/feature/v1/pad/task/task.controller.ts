import { Request, Response } from "express";
import * as taskService from "./task.service";

export const createTaskController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const listId = req.params.id;

        if (typeof listId !== "string") {
            res.status(400).json({ message: "Invalid list id" });
            return;
        }

        const task = await taskService.createTaskService({
            userId: req.user._id.toString(),
            listId,
            title: req.body.title,
            description: req.body.description,
            assignedTo: req.body.assignedTo,
            status: req.body.status,
        });

        res.status(201).json({
            message: "Created task successfully",
            data: task,
        });
    } catch (error) {
        if (error instanceof Error) {
            const status = error.message === "List not found" ? 404 : 400;

            res.status(status).json({
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getTaskController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const listId = req.params.id;

        if (typeof listId !== "string") {
            res.status(400).json({ message: "Invalid list id" });
            return;
        }

        const tasks = await taskService.getTaskService({
            userId: req.user._id.toString(),
            listId,
        });

        res.status(200).json({
            message: "Fetched tasks successfully",
            data: tasks,
        });
    } catch (error) {
        if (error instanceof Error) {
            const status = error.message === "List not found" ? 404 : 400;

            res.status(status).json({
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getTaskByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const taskId = req.params.id;

        if (typeof taskId !== "string") {
            res.status(400).json({ message: "Invalid list id" });
            return;
        }

        const task = await taskService.getTaskByIdService({
            userId: req.user._id.toString(),
            taskId,
        });

        res.status(200).json({
            message: "Fetched task successfully",
            data: task,
        });
    } catch (error) {
        if (error instanceof Error) {
            const status =
                error.message === "Task not found" ||
                error.message === "List not found"
                    ? 404
                    : 400;

            res.status(status).json({
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updateTaskController = async (
    req: Request,
    res: Response
): Promise<void> => {};

export const deleteTaskController = async (
    req: Request,
    res: Response
): Promise<void> => {};
