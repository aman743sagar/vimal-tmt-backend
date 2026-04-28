import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { loginAdmin, logoutAdmin, getUser } from "../controller/userController.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", authMiddleware, getUser);
router.post("/logout", authMiddleware, logoutAdmin);

export default router;