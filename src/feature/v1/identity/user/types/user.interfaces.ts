import { userRole } from "./user.enums";

export interface IUser {
    username: string;
    email: string;
    password: string;

    lastLogin?: Date;

    isActive: boolean;

    avatarUrl?: string;

    role: userRole;

    createdAt: Date;
    updatedAt: Date;
}
