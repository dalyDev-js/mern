import express from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controllers.js";
import { protect } from "../middleware/protectRoute.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", protect, sendMessage);
messageRouter.get("/:id", protect, getMessages);

export default messageRouter;
