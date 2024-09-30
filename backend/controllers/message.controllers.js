import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import catchAsync from "../utils/catchAsync.js";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { message, senderId } = req.body; // Get senderId from the request body
  const { receiverId } = req.params; // Get receiverId from the params

  try {
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    console.log("Conversation found:", conversation);

    // If no conversation exists, create one
    if (!conversation) {
      console.log("Creating a new conversation");
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
      console.log("New conversation created:", conversation);
    }

    // Create and save the message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    console.log("New message created:", newMessage);

    // Push the message ID into the conversation's `messages` array
    conversation.messages.push(newMessage._id);
    await conversation.save(); // Save the conversation after adding the message

    console.log("Message added to conversation:", conversation);

    // SOCKET.IO FUNCTIONALITY: Notify the receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message sent via socket to receiver");
    }

    // Send the response with the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
});
