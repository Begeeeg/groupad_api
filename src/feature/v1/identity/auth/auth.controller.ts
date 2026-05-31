import { Request, Response } from "express";
import * as authService from "./auth.service";

export const signUpController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await authService.signUpService(req.body);

        res.status(201).json({
            message: "User created successfully",
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

export const logInController = async (
    req: Request,
    res: Response
): Promise<void> => {};

export const logOutController = async (
    req: Request,
    res: Response
): Promise<void> => {};
