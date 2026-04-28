import { Router } from "express";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
} from "../controller/productController.js";

const router = Router();


router.post("/create", authMiddleware, upload.single("image"), createProduct);


router.get("/all", getProducts);

router.get("/single/:id", getSingleProduct);

router.put("/update/:id", authMiddleware, upload.single("image"), updateProduct);

router.delete("/delete/:id", authMiddleware, deleteProduct);  
export default router;