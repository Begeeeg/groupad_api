import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import { createTaskController } from "./task.controller";
import { validate } from "../../../../common/validate.data.dto";
import { createTaskSchema } from "./dto/create.data.dto";

const router = express.Router();

router.post(
    "/:id/",
    protectRoutes,
    validate(createTaskSchema),
    createTaskController
);

export default router;
