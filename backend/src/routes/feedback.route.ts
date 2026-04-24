import { Router } from "express";
import { getFeedback, submitFeedback } from "../controllers/feedback.controller";


const router = Router();

router.post("/", submitFeedback);
router.get("/:assignmentId", getFeedback);


export default router;