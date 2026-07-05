import { Router } from "express";
import { authRouter } from "./feature/v1/identity/auth";
import { userRouter } from "./feature/v1/identity/user";
import { listRouter } from "./feature/v1/pad/list";
import { taskRouter } from "./feature/v1/pad/task";

const router = Router();

router.use("/identity/auth", authRouter);
router.use("/identity/user", userRouter);
router.use("/pad/list", listRouter);
router.use("/pad/task", taskRouter);

export default router;
