// In server/routes/propertyRoutes.js
import express from 'express';
// Import the new controller functions from the correct path
import { getAllProperties, getPropertyById } from "../controllers/ownerController.js";

const router = express.Router();

// GET all properties
router.get("/", getAllProperties);
// GET a single property by ID
router.get("/:id", getPropertyById);

export default router;