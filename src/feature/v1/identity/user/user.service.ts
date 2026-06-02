import mongoose from "mongoose";
import { GetUserData } from "./types/user.types";
import UserModel from "./user.model";

export const getUserService = async ({ id }: GetUserData) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
    };
};
