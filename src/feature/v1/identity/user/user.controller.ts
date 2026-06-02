import { Request, Response } from "express";
import * as userService from "./user.service";

export const getUserController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await userService.getUserService({ id: req.user._id });

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
