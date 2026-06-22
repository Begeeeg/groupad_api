import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import { createTaskController, getTaskController } from "./task.controller";
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

export default router;
