import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getSliders,
  addSlider,
  deleteSlider,
  updateSlider,
} from "../controller/SliderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/all", getSliders);
router.post("/create", authMiddleware, upload.single("image"), addSlider);
router.put("/update/:id", authMiddleware, upload.single("image"), updateSlider);
router.delete("/delete/:id", authMiddleware, deleteSlider);

export default router;