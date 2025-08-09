// server/models/Property.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  description: String,
  image: String
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
 