import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/userModel.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const hashedPassword = await bcrypt.hash("vimal@852", 10);

  await Admin.create({
    name: "Vimal Admin",
    username: "vimaladmin@123",
    password: hashedPassword,
  });

  console.log("Admin created successfully");
  process.exit();
};

createAdmin();