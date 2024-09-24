import express from "express";
import {
  deleteMe,
  deleteUserById,
  getUserById,
  getUsersPendingVerification,
  updateMe,
  updateUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/getUser/:id", getUserById);
userRouter.patch("/updateMe", protect, updateMe);
userRouter.delete("/deleteMe", deleteMe);
userRouter.get("/pending-verification", getUsersPendingVerification);

userRouter.patch("/updateUser/:id", updateUserById);
userRouter.delete("/deleteUser/:id", deleteUserById);

export default userRouter;
