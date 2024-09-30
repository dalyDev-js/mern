import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMessagesByConversationId } from "../../redux/slices/chatSlice";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import { fetchUserById } from "../../redux/slices/userSlice"; // Assuming fetchUserById exists in userSlice

const socket = io("http://localhost:8000");

const ActiveChat = ({ conversation }) => {
  const dispatch = useDispatch();
  const { engineerId } = useParams(); // Get engineerId from URL params
  const [receiverName, setReceiverName] = useState(""); // State to store receiver's name
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Decode token to get the senderId (client or logged-in user)
  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const senderId = decodedToken.id;

  // The receiverId will be the engineer's ID from the params or other participant in the conversation
  const receiverId =
    engineerId ||
    conversation.participants.find(
      (participant) => participant._id !== senderId
    )._id;

  useEffect(() => {
    // Fetch messages for the active conversation
    const fetchMessages = async () => {
      const response = await dispatch(
        fetchMessagesByConversationId(conversation._id)
      );
      setMessages(response.payload.messages);

      // Fetch receiver's full name
      const userResponse = await dispatch(fetchUserById(receiverId));
      setReceiverName(userResponse.payload.fullName); // Set receiver's full name
    };

    fetchMessages();

    // Join the conversation room via socket
    socket.emit("joinRoom", { conversationId: conversation._id });

    // Listen for new incoming messages
    socket.on("newMessage", (message) => {
      if (message.conversationId === conversation._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("newMessage"); // Clean up the listener
    };
  }, [conversation._id, dispatch, receiverId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        conversationId: conversation._id,
        senderId,
        receiverId,
        message: newMessage,
      };

      // Emit the new message through socket
      socket.emit("sendMessage", messageData);

      // Locally add the new message to the messages list
      setMessages((prevMessages) => [...prevMessages, messageData]);

      setNewMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Chat with {receiverName}</h2>
      <div className="messages bg-gray-100 p-4 rounded-lg overflow-auto h-80 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="message bg-blue-200 p-2 my-2 rounded">
            {msg.message}
          </div>
        ))}
      </div>
      <div className="message-input flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ActiveChat;
