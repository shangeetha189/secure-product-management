import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  stock: Number,
  description: String
});

const Product = mongoose.model("Product", productSchema);

export default Product;