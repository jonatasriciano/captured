import { Router } from "express";
import { getPropertiesByQuestion } from "../controllers/classificationController";

const router = Router();

// Important: Route for question-based tags and returning best matching properties
router.post("/", getPropertiesByQuestion);

export default router;
