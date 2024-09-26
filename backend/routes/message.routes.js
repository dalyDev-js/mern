import express from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controllers.js";
import { protect } from "../middleware/protectRoute.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/:id", getMessages);

export default messageRouter;
