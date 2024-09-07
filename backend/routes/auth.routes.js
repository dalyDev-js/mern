import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

export default router;
