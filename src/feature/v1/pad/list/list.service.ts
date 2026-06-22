import UserModel from "../../identity/user/user.model";
import ListModel from "./list.model";
import {
    CreateListData,
    GetListData,
    ListData,
    UpdateListData,
} from "./types/list.types";
import { listType } from "./types/list.enums";

export const createListService = async ({
    userId,
    title,
    type,
    members,
    dueDate,
}: CreateListData) => {
    const user = await UserModel.findById(userId);

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

export const getListService = async ({ userId }: GetListData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const lists = await ListModel.find({
        $or: [{ userId: user._id }, { members: user._id }],
    }).sort({ createdAt: -1 });

    return lists;
};

export const getListByIdService = async ({ userId, listId }: ListData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const list = await ListModel.findById(listId);

    if (!list) {
        throw new Error("List not found");
    }

    const isOwner = list.userId.equals(user._id);
    const isMember = (list.members ?? []).some((memberId) =>
        memberId.equals(user._id)
    );

    if (!isOwner && !isMember) {
        throw new Error("You do not have access to this list");
    }

    return list;
};

export const updateListService = async ({
    userId,
    listId,
    title,
    type,
    members,
    dueDate,
}: UpdateListData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const list = await ListModel.findById(listId);

    if (!list) {
        throw new Error("List not found");
    }

    if (!list.userId.equals(user._id)) {
        throw new Error("Only the list owner can update this list");
    }

    const nextType = type ?? list.type;

    let memberIds: (typeof user._id)[] | undefined = undefined;

    if (members !== undefined) {
        if (nextType === listType.Personal && members.length) {
            throw new Error("Personal lists cannot have members");
        }

        if (nextType === listType.Group && members.length === 0) {
            throw new Error("Group lists require at least one member");
        }

        if (members.length) {
            const normalizedMembers = members.map((username) =>
                username.trim()
            );

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
                const foundUsernames = memberUsers.map(
                    (member) => member.username
                );

                const missingUsernames = uniqueMembers.filter(
                    (username) => !foundUsernames.includes(username)
                );

                throw new Error(
                    `User(s) not found: ${missingUsernames.join(", ")}`
                );
            }

            memberIds = memberUsers.map((member) => member._id);
        } else {
            memberIds = [];
        }
    } else if (nextType === listType.Personal && (list.members ?? []).length) {
        throw new Error(
            "Personal lists cannot have members. Clear members before changing type."
        );
    } else if (
        nextType === listType.Group &&
        (list.members ?? []).length === 0
    ) {
        throw new Error("Group lists require at least one member");
    }

    if (title !== undefined) {
        list.title = title.trim();
    }

    if (type !== undefined) {
        list.type = type;
    }

    if (memberIds !== undefined) {
        list.members = memberIds;
    }

    if (dueDate !== undefined) {
        list.dueDate = dueDate;
    }

    await list.save();

    return list;
};

export const deleteListService = async ({ userId, listId }: ListData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const list = await ListModel.findById(listId);

    if (!list) {
        throw new Error("List not found");
    }

    if (!list.userId.equals(user._id)) {
        throw new Error("Only the list owner can delete this list");
    }

    await ListModel.deleteOne({ _id: list._id });

    return list;
};
