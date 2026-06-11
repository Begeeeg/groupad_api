import { model, Schema } from "mongoose";
import { IList } from "./types/list.interfaces";
import { listType } from "./types/list.enums";

const ListSchema = new Schema<IList>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: Object.values(listType),
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dueDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ListModel = model<IList>("List", ListSchema);

export default ListModel;
