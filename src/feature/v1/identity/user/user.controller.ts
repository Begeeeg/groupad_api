import { Request, Response } from "express";
import * as userService from "./user.service";

export const getUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await userService.getUserService({
            id: req.user._id.toString(),
        });

        res.status(200).json({
            message: "User fetched successfully",
            data: user,
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

export const updateUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await userService.updateUserService({
            id: req.user._id.toString(),
            username: req.body.username,
            password: req.body.password,
        });

        res.status(200).json({
            message: "User updated successfully",
            data: user,
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
