import Admin from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure:true,
        sameSite:"None",
        path:"/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
        },
      });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};


export const getUser=async(req,res)=>{
  try {
    const user=await Admin.findById(req.userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
}


export const logoutAdmin = (req, res) => {
  try {
    res
      .clearCookie("token",{
        httpOnly: true,
        secure:true,
        sameSite:"None",
        path:"/",
      })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};