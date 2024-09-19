import express from "express";
import { deleteMe, updateMe } from "../controllers/userController.js";
import { protect } from "../middleware/protectRoute.js";

const router = express.Router();

router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", deleteMe);

export default router;
