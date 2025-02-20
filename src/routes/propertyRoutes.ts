import { Router } from "express";
import {
  classifyAllProperties,
  addNewProperty,
} from "../controllers/propertyController";

const router = Router();

// Important: Route for classifying all existing properties
router.post("/classify", classifyAllProperties);

// Important: Route for adding a new property
router.post("/", addNewProperty);

export default router;
