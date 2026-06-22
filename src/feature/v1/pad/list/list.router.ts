import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import { validate } from "../../../../common/validate.data.dto";
import { CreateListSchema } from "./dto/create.data.dto";
import {
    createListController,
    getListByIdController,
    getListController,
    updateListController,
} from "./list.controller";
import { UpdateListSchema } from "./dto/update.data.dto";

const router = express.Router();

router.post(
    "/create",
    protectRoutes,
    validate(CreateListSchema),
    createListController
);
router.get("/get/", protectRoutes, getListController);
router.get("/get/:id", protectRoutes, getListByIdController);
router.patch(
    "/update/:id",
    protectRoutes,
    validate(UpdateListSchema),
    updateListController
);

export default router;
