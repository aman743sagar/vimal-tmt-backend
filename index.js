import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectCloudinary } from "./config/cloudinary.js";

import sliderRoutes from "./routes/SliderRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import testimonialRoute from "./routes/testimonialRoute.js";
import productRoutes from "./routes/productRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();


connectCloudinary();

// ✅ PORT (consistent)
const PORT = process.env.PORT || 8000;

// ✅ CORS (clean)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","vimal-tmt-admin-d989-ljgv0j2gn-amansagar60281-5208s-projects.vercel.app"],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json({ limit: "5mb" })); // 🔥 prevent large payload
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

// ✅ Routes
app.use("/api/sliders", sliderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/products", productRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/auth", userRoutes);

//  404 HANDLER (IMPORTANT)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

//  GLOBAL ERROR HANDLER (FINAL)
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  // multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "File too large (Max 2MB allowed)",
    });
  }

  // file type error
  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ START SERVER
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1); 
  }
};

start();