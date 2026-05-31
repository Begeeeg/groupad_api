// types/auth.interfaces.ts

import { Types } from "mongoose";

export interface IAuth {
    userId: Types.ObjectId;

    password: string;

    lastLogin?: Date | null;

    refreshToken?: string | null;

    createdAt: Date;
    updatedAt: Date;
}
