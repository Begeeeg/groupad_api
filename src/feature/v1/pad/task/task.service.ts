import { Types } from "mongoose";
import UserModel from "../../identity/user/user.model";
import ListModel from "../list/list.model";
import { getListByIdService } from "../list/list.service";
import TaskModel from "./task.model";
import {
    CreateTaskData,
    GetTaskByIdData,
    GetTaskData,
    UpdateTaskData,
} from "./types/task.types";

export const createTaskService = async ({
    userId,
    listId,
    title,
    description,
    assignedTo,
    status,
}: CreateTaskData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const list = await getListByIdService({ userId, listId });

    let assignedIds: Types.ObjectId[] = [];

    if (assignedTo?.length) {
        const uniqueAssignees = [...new Set(assignedTo.map((id) => id.trim()))];

        const invalidIds = uniqueAssignees.filter(
            (id) => !Types.ObjectId.isValid(id)
        );

        if (invalidIds.length) {
            throw new Error(`Invalid user id(s): ${invalidIds.join(", ")}`);
        }

        const assigneeUsers = await UserModel.find({
            _id: { $in: uniqueAssignees },
        }).select("_id username");

        if (assigneeUsers.length !== uniqueAssignees.length) {
            const foundIds = assigneeUsers.map((assignee) =>
                assignee._id.toString()
            );

            const missingIds = uniqueAssignees.filter(
                (id) => !foundIds.includes(id)
            );

            throw new Error(`User(s) not found: ${missingIds.join(", ")}`);
        }

        const listMemberIds = new Set([
            list.userId.toString(),
            ...(list.members ?? []).map((memberId) => memberId.toString()),
        ]);

        const invalidAssignees = assigneeUsers.filter(
            (assignee) => !listMemberIds.has(assignee._id.toString())
        );

        if (invalidAssignees.length) {
            const invalidUsernames = invalidAssignees.map(
                (assignee) => assignee.username
            );

            throw new Error(
                `User(s) are not members of this list: ${invalidUsernames.join(
                    ", "
                )}`
            );
        }

        assignedIds = assigneeUsers.map((assignee) => assignee._id);
    }

    const task = await TaskModel.create({
        userId: user._id,
        listId: list._id,
        title: title.trim(),
        description: description?.trim() ?? "",
        assignedTo: assignedIds,
        status,
    });

    return task;
};

export const getTaskService = async ({ userId, listId }: GetTaskData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const list = await getListByIdService({ userId, listId });

    const tasks = await TaskModel.find({ listId: list._id }).sort({
        createdAt: -1,
    });

    return tasks;
};

export const getTaskByIdService = async ({
    userId,
    taskId,
}: GetTaskByIdData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    await getListByIdService({ userId, listId: task.listId.toString() });

    return task;
};

export const updateTaskService = async ({
    userId,
    taskId,
    title,
    description,
    assignedTo,
    status,
}: UpdateTaskData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    const list = await getListByIdService({
        userId,
        listId: task.listId.toString(),
    });

    let assignedIds: Types.ObjectId[] = [];

    if (assignedTo !== undefined) {
        if (assignedTo.length === 0) {
            task.assignedTo = [];
        } else {
            const uniqueAssignees = [
                ...new Set(assignedTo.map((id) => id.trim())),
            ];

            const invalidIds = uniqueAssignees.filter(
                (id) => !Types.ObjectId.isValid(id)
            );

            if (invalidIds.length) {
                throw new Error(`Invalid user id(s): ${invalidIds.join(", ")}`);
            }

            const assigneeUsers = await UserModel.find({
                _id: { $in: uniqueAssignees },
            }).select("_id username");

            if (assigneeUsers.length !== uniqueAssignees.length) {
                const foundIds = assigneeUsers.map((assignee) =>
                    assignee._id.toString()
                );

                const missingIds = uniqueAssignees.filter(
                    (id) => !foundIds.includes(id)
                );

                throw new Error(`User(s) not found: ${missingIds.join(", ")}`);
            }

            const listMemberIds = new Set([
                list.userId.toString(),
                ...(list.members ?? []).map((memberId) => memberId.toString()),
            ]);

            const invalidAssignees = assigneeUsers.filter(
                (assignee) => !listMemberIds.has(assignee._id.toString())
            );

            if (invalidAssignees.length) {
                const invalidUsernames = invalidAssignees.map(
                    (assignee) => assignee.username
                );

                throw new Error(
                    `User(s) are not members of this list: ${invalidUsernames.join(
                        ", "
                    )}`
                );
            }

            task.assignedTo = assigneeUsers.map((assignee) => assignee._id);
        }
    }

    if (title !== undefined) {
        task.title = title.trim();
    }

    if (description !== undefined) {
        task.description = description.trim();
    }

    if (status !== undefined) {
        task.status = status;
    }

    await task.save();

    return task;
};

export const deleteTaskService = async ({
    userId,
    taskId,
}: GetTaskByIdData) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const task = await TaskModel.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    await getListByIdService({ userId, listId: task.listId.toString() });

    await TaskModel.deleteOne({ _id: task._id });

    return task;
};
