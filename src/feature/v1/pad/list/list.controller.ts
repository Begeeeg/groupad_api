import { Request, Response } from "express";
import * as listService from "./list.service";

export const createListController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const list = await listService.createListService({
            id: req.user._id.toString(),
            title: req.body.title,
            type: req.body.type,
            members: req.body.members,
            dueDate: req.body.dueDate,
        });

        res.status(201).json({
            message: "Created list successfully",
            data: list,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getListController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const lists = await listService.getListService(req.user._id.toString());

        res.status(200).json({
            message: "Fetched lists successfully",
            data: lists,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getListByIdController = async (
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

        const list = await listService.getListByIdService(
            req.user._id.toString(),
            listId
        );

        res.status(200).json({
            message: "Fetched list successfully",
            data: list,
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

export const updateListController = async (
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

        const list = await listService.updateListService({
            userId: req.user._id.toString(),
            listId,
            title: req.body.title,
            type: req.body.type,
            members: req.body.members,
            dueDate: req.body.dueDate,
        });

        res.status(200).json({
            message: "Updated list successfully",
            data: list,
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

export const deleteListController = async (
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

        const list = await listService.deleteListService(
            req.user._id.toString(),
            listId
        );

        res.status(200).json({
            message: "Deleted list successfully",
            data: list,
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
