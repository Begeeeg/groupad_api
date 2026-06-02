import { IUser } from "../feature/v1/identity/user/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
