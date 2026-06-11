import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import { validate } from "../../../../common/validate.data.dto";
import { CreateListSchema } from "./dto/create.data.dto";
import { createListController } from "./list.controller";

const router = express.Router();

router.post(
    "/create",
    protectRoutes,
    validate(CreateListSchema),
    createListController
);

export default router;
