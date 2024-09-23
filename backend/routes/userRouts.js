import express from "express";
import {
  deleteMe,
  getUserById,
  getUsersPendingVerification,
  updateMe,
} from "../controllers/userController.js";
import { protect } from "../middleware/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/getUser/:id", getUserById);
userRouter.patch("/updateMe", protect, updateMe);
userRouter.delete("/deleteMe", deleteMe);
userRouter.get("/pending-verification", getUsersPendingVerification);

export default userRouter;
