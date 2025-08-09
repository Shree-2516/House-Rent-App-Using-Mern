import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Full name of the user
    email: { type: String, required: true, unique: true }, // Email for login
    password: { type: String, required: true }, // Hashed password
    role: { type: String, enum: ["owner", "tenant"], default: 'tenant' }, // Role in rental system
    image: { type: String, default: '' }, // Profile image URL
    phone: { type: String, default: '' }, // Contact number
    address: { type: String, default: '' }, // Optional user address
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
