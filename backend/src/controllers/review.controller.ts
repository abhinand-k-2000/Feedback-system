import { Request, Response } from "express";
import * as reviewService from "../services/review.service";
import { asyncHandler } from "../utls/asyncHandler";


export const createReview = asyncHandler(async (req: Request, res: Response) => {
    const review = await reviewService.createReview(req.body);
    res.json({ success: true, data: review });
})

export const getReviews = asyncHandler(async (_req: Request, res: Response) => {
    const reviews = await reviewService.getReviews();
    res.json({ success: true, data: reviews });
})

export const updateReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = await reviewService.updateReview(id as string, req.body);
    res.json({ success: true, data: review });
})

export const assignReview = asyncHandler(async (req: Request, res: Response) => {
    const reviewAssignment = await reviewService.assignReview(req.body);
    res.json({ success: true, data: reviewAssignment });
})

export const getAssignedReviews = asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const reviews = await reviewService.getAssignedReviews(employeeId as string);
    res.json({ success: true, data: reviews });
})

export const getAllAssignments = asyncHandler(async (_req: Request, res: Response) => {
    const assignments = await reviewService.getAllAssignments();
    res.json({ success: true, data: assignments });
})