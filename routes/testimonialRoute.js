import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial,
} from "../controller/testimonialController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();


router.post("/create", authMiddleware, upload.single("image"), createTestimonial);


router.get("/all", getTestimonials);


router.put("/update/:id", authMiddleware, upload.single("image"), updateTestimonial);

router.delete("/delete/:id", authMiddleware, deleteTestimonial);

export default router;