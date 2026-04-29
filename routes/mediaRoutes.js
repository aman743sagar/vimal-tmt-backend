import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createMedia,
  getMedia,
  deleteMedia,
} from "../controller/mediaController.js";

const router = Router();

router.post("/create", upload.single("image"), authMiddleware, createMedia);

router.get("/all", getMedia);
router.delete("/delete/:id", authMiddleware, deleteMedia);

export default router;