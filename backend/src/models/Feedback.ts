import { model, Schema } from "mongoose";


const FeedbackSchema = new Schema({
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "ReviewAssignment"
    },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true })

export default model("Feedback", FeedbackSchema)
