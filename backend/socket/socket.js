// socket.js

import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken"; // For token verification
import User from "../model/userModel.js";

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS settings
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"], // Replace with your frontend URL
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

// User-Socket mapping
const userSocketMap = {}; // { userId: socketId }

// Function to retrieve receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Middleware to authenticate socket connections
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: Token not provided"));
    }

    // Verify JWT token (adjust the secret as per your setup)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user; // Attach user to socket object
    next();
  } catch (err) {
    console.error("Socket authentication error:", err);
    next(new Error("Authentication error"));
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  const userId = socket.user._id.toString(); // Ensure it's a string

  console.log(`User connected: ${userId} with socket ID: ${socket.id}`);

  // Map userId to socketId
  userSocketMap[userId] = socket.id;

  // Optionally, join the user to their own room for direct messaging
  socket.join(userId);

  // Handle joining a conversation room
  socket.on("joinRoom", ({ conversationId }) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined room: ${conversationId}`);
  });

  // Handle leaving a conversation room
  socket.on("leaveRoom", ({ conversationId }) => {
    socket.leave(conversationId);
    console.log(`User ${userId} left room: ${conversationId}`);
  });

  // Handle sending messages via Socket.IO
  socket.on("sendMessage", async (data) => {
    const { conversationId, content } = data;

    if (!conversationId || !content) {
      return socket.emit("errorMessage", { message: "Invalid message data" });
    }

    // Here, you would typically save the message to the database
    // and then emit it to the conversation room.
    // For simplicity, this example skips database operations.

    const messageData = {
      conversationId,
      sender: userId,
      content,
      timestamp: new Date(),
    };

    // Emit the message to all participants in the conversation room
    io.to(conversationId).emit("newMessage", messageData);
    console.log(`Message sent to room ${conversationId} by user ${userId}`);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId} with socket ID: ${socket.id}`);
    delete userSocketMap[userId];
  });
});

// Make sure to export both the app and io
export { app, io, server };
