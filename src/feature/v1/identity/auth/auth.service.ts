import UserModel from "../user/user.model";
import AuthModel from "./auth.model";
import { LogInData, SignUpData } from "./types/auth.types";
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

export const logInService = async ({ email, password }: LogInData) => {
    const user = await UserModel.findOne({
        email,
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const auth = await AuthModel.findOne({
        userId: user._id,
    }).select("+password");

    if (!auth) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
    };
};
