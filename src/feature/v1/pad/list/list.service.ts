import UserModel from "../../identity/user/user.model";
import ListModel from "./list.model";
import { CreateListData } from "./types/list.types";
import { listType } from "./types/list.enums";

export const createListService = async ({
    id,
    title,
    type,
    members,
    dueDate,
}: CreateListData) => {
    const user = await UserModel.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (type === listType.Personal && members?.length) {
        throw new Error("Personal lists cannot have members");
    }

    if (type === listType.Group && (!members || members.length === 0)) {
        throw new Error("Group lists require at least one member");
    }

    let memberIds: (typeof user._id)[] = [];

    if (members?.length) {
        const normalizedMembers = members.map((username) => username.trim());

        const uniqueMembers = [...new Set(normalizedMembers)];

        if (uniqueMembers.length !== normalizedMembers.length) {
            throw new Error("Duplicate members are not allowed");
        }

        if (uniqueMembers.includes(user.username)) {
            throw new Error("You cannot add yourself as a member");
        }

        const memberUsers = await UserModel.find({
            username: {
                $in: uniqueMembers,
            },
        }).select("_id username");

        if (memberUsers.length !== uniqueMembers.length) {
            const foundUsernames = memberUsers.map((member) => member.username);

            const missingUsernames = uniqueMembers.filter(
                (username) => !foundUsernames.includes(username)
            );

            throw new Error(
                `User(s) not found: ${missingUsernames.join(", ")}`
            );
        }

        memberIds = memberUsers.map((member) => member._id);
    }

    const list = await ListModel.create({
        userId: user._id,
        title: title.trim(),
        type,
        members: memberIds,
        dueDate,
    });

    return list;
};

export const getListService = async (userId: string) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const lists = await ListModel.find({
        $or: [{ userId: user._id }, { members: user._id }],
    }).sort({ createdAt: -1 });

    return lists;
};

export const getListByIdService = async () => {};

export const updateListService = async () => {};

export const deleteListService = async () => {};
