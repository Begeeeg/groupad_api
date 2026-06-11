import { Types } from "mongoose";
import { listType } from "./list.enums";

export interface CreateListData {
    id: string;
    title: string;
    type: listType;
    members?: string[];
    dueDate: Date;
}
