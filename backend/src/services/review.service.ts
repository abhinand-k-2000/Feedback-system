import Review from "../models/Review";
import ReviewAssignment from "../models/ReviewAssignment";
import { IReview, IReviewAssignment } from "../types";



export const createReview = async (data: IReview) => {
    const review = await Review.create(data)
    return review
}

export const getReviews = async () => {
    const reviews = await Review.find().sort({ createdAt: -1 })
    return reviews
}

export const updateReview = async (id: string, data: IReview) => {
    const review = await Review.findByIdAndUpdate(id, data, { new: true })
    return review
}

export const assignReview = async (data: IReviewAssignment) => {
    const reviewAssignment = await ReviewAssignment.create(data)
    return ReviewAssignment.findById(reviewAssignment._id)
        .populate("reviewId", "title description")
        .populate("reviewerId", "name email")
        .populate("revieweeId", "name email")
}

export const getAssignedReviews = async (employeeId: string) => {
    const reviews = await ReviewAssignment.find({
        reviewerId: employeeId,
        status: "pending"
    })
        .populate("reviewId", "title description")
        .populate("reviewerId", "name email")
        .populate("revieweeId", "name email")
    return reviews
}


export const getAllAssignments = async () => {
    return await ReviewAssignment.aggregate([
      { $sort: { createdAt: -1 } },
  
      // Review
      {
        $lookup: {
          from: "reviews",
          localField: "reviewId",
          foreignField: "_id",
          as: "review",
          pipeline: [{ $project: { title: 1 } }],
        },
      },
  
      // Reviewer
      {
        $lookup: {
          from: "employees",
          localField: "reviewerId",
          foreignField: "_id",
          as: "reviewer",
          pipeline: [{ $project: { name: 1, email: 1 } }],
        },
      },
  
      // Reviewee
      {
        $lookup: {
          from: "employees",
          localField: "revieweeId",
          foreignField: "_id",
          as: "reviewee",
          pipeline: [{ $project: { name: 1, email: 1 } }],
        },
      },
  
      // Feedback
      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "assignmentId",
          as: "feedback",
          pipeline: [
            { $project: { comment: 1, rating: 1, createdAt: 1 } },
          ],
        },
      },
  
      // Flatten
      { $unwind: { path: "$review", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$reviewer", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$reviewee", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$feedback", preserveNullAndEmptyArrays: true } },
  
      // Final shape (IMPORTANT)
      {
        $project: {
          _id: 1,
          status: 1,
          createdAt: 1,
  
          review: {
            _id: "$review._id",
            title: "$review.title",
          },
  
          reviewer: {
            _id: "$reviewer._id",
            name: "$reviewer.name",
            email: "$reviewer.email",
          },
  
          reviewee: {
            _id: "$reviewee._id",
            name: "$reviewee.name",
            email: "$reviewee.email",
          },
  
          feedback: {
            rating: "$feedback.rating",
            comment: "$feedback.comment",
            createdAt: "$feedback.createdAt",
          },
        },
      },
    ]);
  };