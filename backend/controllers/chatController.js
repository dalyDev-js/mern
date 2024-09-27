// controllers/chatController.js

import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { getReceiverSocketId } from "../socket/socket.js";

// Send a message
export const sendMessage = catchAsync(async (req, res, next) => {
  const { content, senderId } = req.body; // Get senderId and content from the request body
  const { receiverId } = req.params; // Get receiverId from the params

  try {
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Ensure senderId and receiverId exist
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender ID and Receiver ID are required" });
    }

    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    // Create a new message
    const newMessage = new Message({
      conversation: conversation._id,
      sender: senderId,
      receiver: receiverId,
      content: content.trim(),
    });
    await newMessage.save();

    // Add the new message to the conversation
    conversation.messages.push(newMessage._id);
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    // Emit the new message to the receiver via Socket.IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      console.log("Emitting new message via socket to receiver.");
      io.to(receiverSocketId).emit("newMessage", {
        _id: newMessage._id,
        conversation: newMessage.conversation,
        sender: {
          _id: senderId,
          fullName: req.user.fullName, // Assuming you have this in req.user
        },
        receiver: {
          _id: receiverId,
          fullName: req.body.receiverFullName || "Unknown",
        },
        content: newMessage.content,
        timestamp: newMessage.timestamp,
      });
    }

    // Return the conversation and new message in the response
    res.status(201).json({
      status: "success",
      data: {
        conversation,
        message: newMessage,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
});
// Get all conversations for the logged-in user
export const getConversations = catchAsync(async (req, res, next) => {
  const { userId } = req.body; // User ID from request body

  // Validate userId
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  // Optional: Verify that the requester is authorized to access this user's conversations
  // For example, if you have roles, ensure that admins can access, or the user is accessing their own data

  const conversations = await Conversation.find({
    participants: userId,
  })
    .populate({
      path: "participants",
      select: "fullName email role profilePic",
    })
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "fullName",
      },
    })
    .sort({ updatedAt: -1 });

  res.status(200).json({
    status: "success",
    results: conversations.length,
    data: {
      conversations,
    },
  });
});

// Get messages for a specific conversation
export const getMessages = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const { userId } = req.body; // User ID from request body

  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  if (!conversationId) {
    return next(new AppError("Conversation ID is required", 400));
  }

  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    populate: {
      path: "sender receiver", // Ensure both sender and receiver are populated
      select: "fullName email profilePic",
    },
  });

  if (!conversation) {
    return next(new AppError("Conversation not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      messages: conversation.messages,
    },
  });
});

export const createOrFetchConversation = catchAsync(async (req, res, next) => {
  const { senderId, receiverId } = req.body;

  // Ensure both sender and receiver IDs are provided
  if (!senderId || !receiverId) {
    return next(new AppError("Sender and receiver IDs are required", 400));
  }

  // Check if a conversation already exists between sender and receiver
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  // If no conversation exists, create a new one
  if (!conversation) {
    conversation = new Conversation({
      participants: [senderId, receiverId],
    });
    await conversation.save();
    console.log("New conversation created:", conversation);
  } else {
    console.log("Existing conversation found:", conversation);
  }

  // Return the conversation in the response
  res.status(200).json({
    status: "success",
    data: {
      conversation,
    },
  });
});
