import { Router } from "express";
import {
  createContact,
  getContacts,
  deleteContact,
} from '../controller/ContactController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();


router.post("/create", createContact);


router.get("/all", authMiddleware, getContacts);


router.delete("/delete/:id", authMiddleware, deleteContact);

export default router;