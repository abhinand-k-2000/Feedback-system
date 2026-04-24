import { Router } from "express";
import { assignReview, createReview, getAllAssignments, getAssignedReviews, getReviews, updateReview } from "../controllers/review.controller";


const router = Router();

router.post("/", createReview);
router.get("/", getReviews);
router.put("/:id", updateReview);

router.post("/assignments", assignReview);
router.get("/assignments", getAllAssignments);
router.get("/assigned/:employeeId", getAssignedReviews);


export default router;