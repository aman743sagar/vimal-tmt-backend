import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createMedia,
  getMedia,
  deleteMedia,
} from "../controller/mediaController.js";

const router = Router();

// ✅ upload first, then auth (important)
router.post("/create", upload.single("image"), authMiddleware, createMedia);

router.get("/all", authMiddleware, getMedia);
router.delete("/delete/:id", authMiddleware, deleteMedia);

export default router;