import React, { useEffect, useRef, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageInput from "./MessageInput";
import { SocketContext } from "../../context/SocketContext";
import {
  createOrFetchConversation,
  fetchMessages,
  receiveMessage,
} from "../../redux/slices/chatSlice";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

// Load sound for notifications
const notificationSound = new Audio("/sounds/pop.mp3");

const ChatWindow = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);

  const { receiverId } = useParams();
  const { selectedConversation, messages, error } = useSelector(
    (state) => state.chat
  );

  const token = localStorage.getItem("Token");
  let userId = "";
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  // Function to handle user interaction (like click or scroll)
  const handleUserInteraction = () => {
    setIsUserInteracted(true);
    window.removeEventListener("click", handleUserInteraction);
    window.removeEventListener("keydown", handleUserInteraction);
  };

  useEffect(() => {
    // Listen for a user interaction (once) to enable sound playing
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
      console.log("Decoded User ID: ", userId);
    } catch (e) {
      console.error("Failed to decode token:", e);
    }
  }

  // Create or fetch conversation when the component loads or when receiverId changes
  useEffect(() => {
    if (userId && receiverId) {
      dispatch(createOrFetchConversation({ senderId: userId, receiverId }));
    }
  }, [dispatch, userId, receiverId]);

  // Fetch messages when the selected conversation changes
  useEffect(() => {
    if (selectedConversation) {
      dispatch(
        fetchMessages({ conversationId: selectedConversation._id, userId })
      );
    }
  }, [dispatch, selectedConversation, userId]);

  // Play notification sound when receiving a new message
  const playReceiveSound = () => {
    if (isUserInteracted) {
      notificationSound.play().catch((error) => {
        console.error("Error playing notification sound:", error);
      });
    }
  };

  // Listen for new messages via Socket.IO and play receive sound
  useEffect(() => {
    if (socket && selectedConversation) {
      socket.on("newMessage", (message) => {
        if (message.conversation === selectedConversation._id) {
          dispatch(receiveMessage(message));

          // Play sound only for receiving messages
          if (message.sender._id !== userId) {
            playReceiveSound(); // Play sound when receiving a message
          }
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, dispatch, selectedConversation, userId, isUserInteracted]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Select a conversation to start chatting.</p>
      </div>
    );
  }

  const otherParticipant = selectedConversation.participants.find(
    (user) => user._id === receiverId
  );

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center px-6 py-4 border-b bg-white">
        <img
          src={
            otherParticipant?.profilePic || "https://robohash.org/default.png"
          }
          alt={otherParticipant?.fullName}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          {otherParticipant?.fullName}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50">
        {error ? (
          <div>Error loading messages: {error}</div>
        ) : messages[selectedConversation?._id]?.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages[selectedConversation?._id]?.map((msg) => {
            const senderId = msg.sender?._id || msg?.sender;
            const isSender = senderId === userId;

            return (
              <div
                key={msg?._id}
                className={`flex ${
                  isSender ? "justify-end" : "justify-start"
                } mb-2`}>
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    isSender
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  } shadow`}>
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span
                    className={`block text-xs mt-1 ${
                      isSender ? "text-gray-200" : "text-gray-500"
                    }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        conversationId={selectedConversation._id}
        receiverId={receiverId}
      />
    </div>
  );
};

export default ChatWindow;
