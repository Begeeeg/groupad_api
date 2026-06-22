import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import {
    createTaskController,
    deleteTaskController,
    getTaskByIdController,
    getTaskController,
    updateTaskController,
} from "./task.controller";
import { validate } from "../../../../common/validate.data.dto";
import { createTaskSchema } from "./dto/create.data.dto";
import { updateTaskSchema } from "./dto/update.data.dto";

const router = express.Router();

router.post(
    "/:id/",
    protectRoutes,
    validate(createTaskSchema),
    createTaskController
);
router.get("/:id/", protectRoutes, getTaskController);
router.get("/:id/:id", protectRoutes, getTaskByIdController);
router.patch(
    "/:id/:id",
    protectRoutes,
    validate(updateTaskSchema),
    updateTaskController
);
router.delete("/:id/:id", protectRoutes, deleteTaskController);

export default router;
