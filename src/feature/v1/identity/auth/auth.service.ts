import UserModel from "../user/user.model";
import AuthModel from "./auth.model";
import { SignUpData } from "./types/auth.types";
import bcrypt from "bcryptjs";

export const signUpService = async ({
    username,
    email,
    password,
}: SignUpData) => {
    const existingEmail = await UserModel.findOne({
        email,
    });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        email,
    });

    await AuthModel.create({
        userId: user._id,
        password: hashedPassword,
    });

    return {
        id: user._id,
        username: user.username,
        email: user.email,
    };
};

export const logInService = async () => {};

export const logOutService = async () => {};
