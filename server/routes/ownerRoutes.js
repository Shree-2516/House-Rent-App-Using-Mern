import express from "express";
import { protect } from "../middleware/auth.js";
import {
    addHouse,
    changeRoleToOwner,
    deleteHouse,
    getDashboardData,
    getOwnerHouses,
    toggleHouseAvailability,
    updateUserImage,
    getAllProperties // <-- Add this new controller function
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

// Change user role to owner (landlord)
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Add a new house listing
ownerRouter.post("/add-house", upload.single("image"), protect, addHouse);

// Get all houses owned by the logged-in owner
ownerRouter.get("/houses", protect, getOwnerHouses);

// Get a list of ALL properties (for the public-facing pages)
ownerRouter.get("/properties", getAllProperties); // <-- New route without `protect` middleware

// Toggle house availability (Available/Unavailable)
ownerRouter.post("/toggle-house", protect, toggleHouseAvailability);

// Delete a house listing
ownerRouter.post("/delete-house", protect, deleteHouse);

// Owner dashboard data (bookings, revenue, etc.)
ownerRouter.get('/dashboard', protect, getDashboardData);

// Update owner profile image
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage);

export default ownerRouter;