import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import House from "../models/House.js";
import User from "../models/User.js";
import fs from "fs";

// API to Change Role of User
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({ success: true, message: "Now you can list houses" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to List a House
export const addHouse = async (req, res) => {
    try {
        const { _id } = req.user;
        let house = JSON.parse(req.body.houseData);
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/houses"
        });

        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: "1280" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });

        const image = optimizedImageUrl;
        await House.create({ ...house, owner: _id, image });

        res.json({ success: true, message: "House Added" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to List Owner Houses
export const getOwnerHouses = async (req, res) => {
    try {
        const { _id } = req.user;
        const houses = await House.find({ owner: _id });
        res.json({ success: true, houses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// ** NEW CONTROLLER FUNCTION ADDED HERE **
// API to get a list of ALL properties (for public-facing pages)
export const getAllProperties = async (req, res) => {
    try {
        const properties = await House.find();
        res.status(200).json({ success: true, properties });
    } catch (error) {
        console.error("Error fetching all properties:", error);
        res.status(500).json({ success: false, message: 'Server error fetching properties' });
    }
};

// ** NEW CONTROLLER FUNCTION ADDED HERE **
// API to get a single property by its ID
export const getPropertyById = async (req, res) => {
    try {
        const property = await House.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        res.status(200).json({ success: true, property });
    } catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ success: false, message: 'Server error fetching property' });
    }
};

// API to Toggle House Availability
export const toggleHouseAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { houseId } = req.body;
        const house = await House.findById(houseId);

        // Check if house belongs to the user
        if (!house || house.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        house.isAvailable = !house.isAvailable;
        await house.save();

        res.json({ success: true, message: "Availability Toggled" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to delete a House
export const deleteHouse = async (req, res) => {
    try {
        const { _id } = req.user;
        const { houseId } = req.body;
        const house = await House.findById(houseId);

        // Check if house belongs to the user
        if (!house || house.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        house.owner = null;
        house.isAvailable = false;

        await house.save();

        res.json({ success: true, message: "House Removed" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;

        if (role !== "owner") {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const houses = await House.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id })
            .populate("house")
            .sort({ createdAt: -1 });

        const pendingBookings = await Booking.find({
            owner: _id,
            status: "pending"
        });
        const completedBookings = await Booking.find({
            owner: _id,
            status: "confirmed"
        });

        // Calculate monthlyRevenue from confirmed bookings
        const monthlyRevenue = bookings
            .filter(booking => booking.status === "confirmed")
            .reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalHouses: houses.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to update user image
export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users"
        });

        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: "400" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, { image });
        res.json({ success: true, message: "Image Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};