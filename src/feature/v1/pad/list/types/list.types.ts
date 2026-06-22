import { listType } from "./list.enums";

export interface CreateListData {
    userId: string;
    title: string;
    type: listType;
    members?: string[];
    dueDate: Date;
}

export interface UpdateListData {
    userId: string;
    listId: string;
    title?: string;
    type?: listType;
    members?: string[];
    dueDate?: Date;
}

export interface ListData {
    userId: string;
    listId: string;
}

export interface GetListData {
    userId: string;
}
