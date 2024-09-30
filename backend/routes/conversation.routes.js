import express from "express";
import {
  getAllConversations,
  getMessagesByConversationId,
  getOrCreateConversation,
} from "../controllers/conversationController.js";

const conversationRouter = express.Router();

// Get all conversations for the logged-in user
conversationRouter.get("/:userId", getAllConversations);

// Get or create conversation between sender and receiver
conversationRouter.post("/:receiverId", getOrCreateConversation);

// Get all messages in a specific conversation
conversationRouter.get(
  "/:conversationId/messages",
  getMessagesByConversationId
);

export default conversationRouter;
