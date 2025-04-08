import mongoose from "mongoose";

// create schema of product in mongoDB
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true } // createAt updateAt
);

// create Model from ข้างบน (schema)
const Product = mongoose.model("Product", productSchema);

export default Product;
