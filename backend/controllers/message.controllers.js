import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

import { getReceiverSocketId, io } from "../socket/socket.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { message, senderId } = req.body;
  const { id: receiverId } = req.params;
  // const senderId = req.user.body;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });
  console.log(newMessage);
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([conversation.save(), newMessage.save()]);

  // SOCKET IO FUNCTIONALITY WILL GO HERE
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

export const getMessages = catchAsync(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [userToChatId, senderId] },
  }).populate("messages");

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  if (!conversation) {
    return next(new AppError("conversation not found !!"));
  }
  const messages = conversation.messages;

  res.status(200).json(messages);
});
