import express from "express";
import {
  deleteMe,
  getUserById,
  updateMe,
} from "../controllers/userController.js";
import { protect } from "../middleware/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/getUser/:id", getUserById);
userRouter.patch("/updateMe", protect, updateMe);
userRouter.delete("/deleteMe", deleteMe);

export default userRouter;
