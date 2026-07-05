import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./feature/v1/identity/auth";
import { userRouter } from "./feature/v1/identity/user";
import { listRouter } from "./feature/v1/pad/list";
import { taskRouter } from "./feature/v1/pad/task";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/identity/auth", authRouter);
app.use("/api/v1/identity/user", userRouter);
app.use("/api/v1/pad/list", listRouter);
app.use("/api/v1/pad/task", taskRouter);

export default app;
