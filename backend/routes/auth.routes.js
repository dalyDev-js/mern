import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  updatePassword,
} from "../controllers/auth.controllers.js";
import { protect } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.delete("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);

export default router;
