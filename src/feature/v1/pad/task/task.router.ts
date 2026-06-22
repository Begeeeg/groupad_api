import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import {
    createTaskController,
    getTaskByIdController,
    getTaskController,
} from "./task.controller";
import { validate } from "../../../../common/validate.data.dto";
import { createTaskSchema } from "./dto/create.data.dto";

const router = express.Router();

router.post(
    "/:id/",
    protectRoutes,
    validate(createTaskSchema),
    createTaskController
);
router.get("/:id/", protectRoutes, getTaskController);
router.get("/:id/:id", protectRoutes, getTaskByIdController);

export default router;
