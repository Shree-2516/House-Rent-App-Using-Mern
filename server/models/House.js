import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const houseSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User", required: true }, // House owner
    title: { type: String, required: true }, // Short title for listing
    propertyType: { 
      type: String, 
      required: true, 
      enum: ["Apartment", "Villa", "Independent House", "Studio", "Other"] 
    }, // Type of property
    images: [{ type: String, required: true }], // Array of image URLs
    builtYear: { type: Number }, // Optional: construction year
    category: { 
      type: String, 
      required: true, 
      enum: ["Rent", "Lease"] 
    }, // Whether it's for rent or lease
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    furnished: { 
      type: String, 
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"], 
      default: "Unfurnished" 
    },
    size: { type: Number, required: true }, // in sq ft or sq meters
    pricePerMonth: { type: Number, required: true }, // Rent amount
    location: { type: String, required: true },
    description: { type: String, required: true },
    amenities: [{ type: String }], // e.g., "Parking", "Balcony", "Gym"
    isAvailable: { type: Boolean, default: true }, // Availability status
  },
  { timestamps: true }
);

const House = mongoose.model("House", houseSchema);

export default House;
