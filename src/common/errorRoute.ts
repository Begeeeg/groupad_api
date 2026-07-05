import { Request, Response, NextFunction } from "express";

export const notFoundRoute = (_req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
};

export const errorRoute = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal server error",
    });
};
