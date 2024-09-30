// routes/chatRoutes.js

import express from "express";
import {
  sendMessage,
  getConversations,
  getMessages,
  createOrFetchConversation,
} from "../controllers/chatController.js";

const chatRouter = express.Router();

// Route to send a message
// POST /api/chat/send/:receiverId
chatRouter.post("/send/:receiverId", sendMessage);

// Route to get all conversations for a user
// GET /api/chat/conversations
chatRouter.post("/conversations", getConversations);
chatRouter.post("/conversation", createOrFetchConversation);
// Route to get messages for a specific conversation
// GET /api/chat/messages/:conversationId
chatRouter.post("/messages/:conversationId", getMessages);

export default chatRouter;
