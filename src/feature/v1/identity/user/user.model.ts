import { Schema, model } from "mongoose";
import { IUser } from "./types/user.interfaces";
import { userRole } from "./types/user.enums";

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        avatarUrl: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: Object.values(userRole),
            default: userRole.User,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
