import { model, Schema } from "mongoose";


const ReviewAssignmentSchema = new Schema({
    reviewId: {
        type: Schema.Types.ObjectId,
        ref: "Review"
    },
    reviewerId: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    revieweeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    status: {
        type: String,
        enum: ['pending', 'completed']
    }
}, { timestamps: true })

export default model("ReviewAssignment", ReviewAssignmentSchema)