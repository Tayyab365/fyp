import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{ type: String }] // array of image URLs (Cloudinary etc later)
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
