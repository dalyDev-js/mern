import express from "express";
import { sendMessage } from "../controllers/message.controllers.js";

const messageRouter = express.Router();

// Send a message and create conversation if it doesn't exist
messageRouter.post("/send/:receiverId", sendMessage);

export default messageRouter;
