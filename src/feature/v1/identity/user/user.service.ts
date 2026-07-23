import AuthModel from "../auth/auth.model";
import { GetUserData, UpdateUserData } from "./types/user.types";
import UserModel from "./user.model";
import bcrypt from "bcryptjs";

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

export const updateUserService = async ({
    id,
    username,
    password,
}: UpdateUserData) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error("User not found");
    }

    const auth = await AuthModel.findOne({
        userId: user._id,
    }).select("+password");

    if (!auth) {
        throw new Error("Auth record not found");
    }

    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    if (username === user.username) {
        throw new Error(
            "New username must be different from your current username"
        );
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        throw new Error("Username already in use");
    }

    user.username = username;
    await user.save();

    return {
        id: user._id,
        username: user.username,
    };
};

export const searchUsersService = async ({
    query,
    excludeId,
}: {
    query: string;
    excludeId: string;
}) => {
    return UserModel.find({
        _id: { $ne: excludeId },
        username: { $regex: query, $options: "i" },
    })
        .select("_id username")
        .limit(10);
};
