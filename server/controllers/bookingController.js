import Booking from "../models/Booking.js";
import House from "../models/House.js";

// Function to Check Availability of House for a given Date
const checkAvailability = async (house, checkInDate, checkOutDate) => {
    const bookings = await Booking.find({
        house,
        checkInDate: { $lte: checkOutDate },
        checkOutDate: { $gte: checkInDate },
    });
    return bookings.length === 0;
};

// API to Check Availability of Houses for the given Date and location
export const checkAvailabilityOfHouse = async (req, res) => {
    try {
        const { location, checkInDate, checkOutDate } = req.body;

        // fetch all available houses for the given location
        const houses = await House.find({ location, isAvailable: true });

        // check house availability for the given date range
        const availableHousesPromises = houses.map(async (house) => {
            const isAvailable = await checkAvailability(house._id, checkInDate, checkOutDate);
            return { ...house._doc, isAvailable: isAvailable };
        });

        let availableHouses = await Promise.all(availableHousesPromises);
        availableHouses = availableHouses.filter(house => house.isAvailable === true);

        res.json({ success: true, availableHouses });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { house, checkInDate, checkOutDate } = req.body;

        const isAvailable = await checkAvailability(house, checkInDate, checkOutDate);
        if (!isAvailable) {
            return res.json({ success: false, message: "House is not available" });
        }

        const houseData = await House.findById(house);

        // Calculate price based on checkInDate and checkOutDate
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const noOfDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const price = houseData.pricePerNight * noOfDays;

        await Booking.create({
            house,
            owner: houseData.owner,
            user: _id,
            checkInDate,
            checkOutDate,
            price
        });

        res.json({ success: true, message: "Booking Created" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to List User Bookings 
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id })
            .populate("house")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" });
        }
        const bookings = await Booking.find({ owner: req.user._id })
            .populate('house user')
            .select("-user.password")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
