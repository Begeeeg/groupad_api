import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./feature/v1/identity/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/identity/auth", authRouter);

export default app;
