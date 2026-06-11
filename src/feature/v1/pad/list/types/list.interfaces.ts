import { Types } from "mongoose";
import { listType } from "./list.enums";

export interface IList {
    userId: Types.ObjectId;
    title: string;
    type: listType;
    members?: Types.ObjectId[];
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
