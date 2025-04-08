import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config(); // call use dote

const app = express();
const PORT = process.env.PORT || 5000;

// 1. frontend + backend = port 5000
const __dirname = path.resolve();

// Middleware ที่ช่วยให้เรารับข้อมูล JSON ใน req.body middleware คือฟังก์ชันที่ทำงานก่อนส่งคำตอบกลับไปยังไคลเอนต์
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);
// use postman or frontend check API

// 2. frontend + backend = port 5000
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/("*")/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
