import { Types } from "mongoose";

export type Role = 'admin' | 'employee';

export interface IEmployee {
    name: string;
    email: string;
    role: Role;
}

export interface IReview {
    title: string;
    description: string;
    createdBy: string | Types.ObjectId;
}

export interface IReviewAssignment {
    reviewId: string;
    reviewerId: string;
    revieweeId: string;
    status: 'pending' | 'completed';
}

export interface IFeedback {
    assignmentId: string;
    comment: string;
    rating: number;
}