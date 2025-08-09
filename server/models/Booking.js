import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: ObjectId,
      ref: "Property",
      required: true, // property being rented
    },
    renter: {
      type: ObjectId,
      ref: "User",
      required: true, // person booking/renting
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true, // property owner
    },
    startDate: {
      type: Date,
      required: true, // rental start date
    },
    endDate: {
      type: Date,
      required: true, // rental end date
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true, // total rent for the period
    },
    securityDeposit: {
      type: Number,
      default: 0, // optional deposit for damages
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    leaseAgreement: {
      type: String, // URL/path to digital lease agreement
    },
    propertySnapshot: {
      type: String, // optional static image URL at time of booking
    },
    messageThread: {
      type: ObjectId,
      ref: "Message", // for renter-owner chat history
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
