import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

// Import Routes
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js"; // Correct import

// Initialize Express App
const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => res.send("🏠 House Rental App API is running"));

// Routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// Use the new property router for public-facing property routes
app.use('/api/properties', propertyRouter);

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));