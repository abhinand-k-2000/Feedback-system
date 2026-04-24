import { Router } from "express";
import employeeRoutes from "./employee.route";
import reviewRoutes from "./review.route";
import feedbackRoutes from "./feedback.route";


const router = Router();

router.use("/employees", employeeRoutes);
router.use("/reviews", reviewRoutes);
router.use("/feedback", feedbackRoutes);


export default router;