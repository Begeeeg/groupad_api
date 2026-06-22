import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import { validate } from "../../../../common/validate.data.dto";
import { CreateListSchema } from "./dto/create.data.dto";
import { createListController, getListController } from "./list.controller";

const router = express.Router();

router.post(
    "/create",
    protectRoutes,
    validate(CreateListSchema),
    createListController
);
router.get("/get/", protectRoutes, getListController);

export default router;
