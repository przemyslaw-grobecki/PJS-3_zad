//Imports
import mongoose from "mongoose";
const { Schema, model } = mongoose;

//Configure database schema
const productSchema = new Schema({
    name: {type: String, unique: true, dropDups: true },
    category: String,
    price: Number,
    quantity: Number,
    imageURL: String
});

const Product = model("Product", productSchema);

export default Product;