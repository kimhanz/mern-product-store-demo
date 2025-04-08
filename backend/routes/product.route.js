import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

//get route
router.get("/", getProducts);
// create route
router.post("/", createProduct);
//update a route อััพเดทแทน field เดิมทั้งหมด
router.put("/:id", updateProduct);
//delete route
router.delete("/:id", deleteProduct);

export default router;
