import express from "express";
import { protectRoutes } from "../../../../common/protectRoutes";
import {
    getUserController,
    searchUsersController,
    updateUserController,
} from "./user.controller";
import { validate } from "../../../../common/validate.data.dto";
import { UpdateUserSchema } from "./dto/update.data.dto";

const router = express.Router();

router.get("/", protectRoutes, getUserController);
router.patch(
    "/",
    protectRoutes,
    validate(UpdateUserSchema),
    updateUserController
);
router.get("/search", protectRoutes, searchUsersController);

export default router;
