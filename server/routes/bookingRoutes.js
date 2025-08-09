import express from "express";
import {
    changeBookingStatus,
    checkAvailabilityOfHouse,
    createBooking,
    getOwnerBookings,
    getUserBookings
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

// Check if a house is available for the selected dates
bookingRouter.post('/check-availability', checkAvailabilityOfHouse);

// Create a new booking (only logged-in users)
bookingRouter.post('/create', protect, createBooking);

// Get all bookings for a logged-in user (renter)
bookingRouter.get('/user', protect, getUserBookings);

// Get all bookings for a logged-in owner (landlord)
bookingRouter.get('/owner', protect, getOwnerBookings);

// Change booking status (approve, reject, cancel, etc.)
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;
