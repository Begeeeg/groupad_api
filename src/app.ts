import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRouter from "./router";
import { errorRoute, notFoundRoute } from "./common/errorRoute";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/v1", apiRouter);

app.use(notFoundRoute);
app.use(errorRoute);

export default app;
