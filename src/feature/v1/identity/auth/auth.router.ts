import express from "express";
import { SignupUserSchema } from "./dto/signup.data.dto";
import { validate } from "../../../../common/validate.data.dto";
import { signUpController } from "./auth.controller";

const router = express.Router();

router.post("/signup", validate(SignupUserSchema), signUpController);

export default router;
