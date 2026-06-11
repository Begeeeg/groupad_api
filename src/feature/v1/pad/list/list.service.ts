import { Types } from "mongoose";
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

    let memberIds: Types.ObjectId[] = [];

    if (members?.length) {
        const memberUsers = await UserModel.find({
            username: {
                $in: members,
            },
        });

        if (memberUsers.length !== members.length) {
            const foundUsernames = memberUsers.map((user) => user.username);

            const missingUsers = members.filter(
                (username) => !foundUsernames.includes(username)
            );

            throw new Error(`Users not found: ${missingUsers.join(", ")}`);
        }

        memberIds = memberUsers.map((user) => user._id);
    }

    const list = await ListModel.create({
        userId: user._id,
        title,
        type,
        members: memberIds,
        dueDate,
    });

    const populatedList = await ListModel.findById(list._id).populate(
        "members",
        "username"
    );

    return {
        ...populatedList!.toObject(),
        members: (populatedList!.members as any[]).map(
            (member) => member.username
        ),
    };
};

export const getListService = async () => {};

export const getListByIdService = async () => {};

export const updateListService = async () => {};

export const deleteListService = async () => {};
