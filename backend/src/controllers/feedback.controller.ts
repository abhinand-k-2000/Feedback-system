import { Request, Response } from "express";
import * as feedbackService from "../services/feedback.service";
import { asyncHandler } from "../utls/asyncHandler";


export const submitFeedback = asyncHandler(async (req: Request, res: Response) => {
    const feedback = await feedbackService.submitFeedback(req.body);
    res.json({ success: true, data: feedback });
})

export const getFeedback = asyncHandler(async (req: Request, res: Response) => {
    const { assignmentId } = req.params;
    const feedback = await feedbackService.getFeedback(assignmentId as string);
    res.json({ success: true, data: feedback });
})