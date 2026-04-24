import { model, Schema } from "mongoose";
import { IReview } from "../types";

export interface ReviewDocument extends IReview, Document { }

const ReviewSchema = new Schema<ReviewDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }
}, { timestamps: true })


export default model<ReviewDocument>("Review", ReviewSchema)