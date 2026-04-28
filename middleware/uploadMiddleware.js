import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "uploads",
      resource_type: "image",

      public_id: Date.now() + "-" + file.originalname,

      // 🔥 ONLY COMPRESSION (NO WIDTH/HEIGHT)
      transformation: [
        {
          quality: "auto:low",   
          fetch_format: "auto", 
        },
      ],
    };
  },
});

const upload = multer({
  storage,

  // ✅ FILE SIZE LIMIT (2MB recommended)
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },

  // ✅ ONLY IMAGE ALLOWED
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export default upload;