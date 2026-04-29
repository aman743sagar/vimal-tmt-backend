import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 🍪 cookie se token lo
    const token = req.cookies?.token;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 🔐 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ user attach
    req.userId = decoded.id;
    

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

export default authMiddleware;