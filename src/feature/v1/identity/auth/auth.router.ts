import express from "express";
import { SignupUserSchema } from "./dto/signup.data.dto";
import { validate } from "../../../../common/validate.data.dto";
import {
    logInController,
    logOutController,
    signUpController,
} from "./auth.controller";
import { LoginSchema } from "./dto/login.data.dto";

const router = express.Router();

router.post("/signup", validate(SignupUserSchema), signUpController);
router.post("/login", validate(LoginSchema), logInController);
router.post("/logout", logOutController);

export default router;
