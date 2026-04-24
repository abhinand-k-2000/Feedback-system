import Feedback from "../models/Feedback";
import ReviewAssignment from "../models/ReviewAssignment";
import { IFeedback } from "../types";
import { AppError } from "../utls/AppError";


export const submitFeedback = async (data: IFeedback) => {

    const existingFeedback = await Feedback.findOne({
        assignmentId: data.assignmentId
    })

    if (existingFeedback) {
        throw new AppError(400, "Feedback already submitted");
    }
    const feedback = await Feedback.create(data);

    await ReviewAssignment.findByIdAndUpdate(data.assignmentId, {
        status: "completed"
    })

    return feedback
}

export const getFeedback = async (assignmentId: string) => {
    const feedback = await Feedback.findOne({
        assignmentId: assignmentId
    })
    return feedback
}