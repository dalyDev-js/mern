import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/slices/chatSlice";
import { SocketContext } from "../../context/SocketContext";
import { jwtDecode } from "jwt-decode";
import { FiSend } from "react-icons/fi";

// Load send sound
const sendSound = new Audio("/sounds/pop.mp3");

const MessageInput = ({ conversationId, receiverId, playSendSound }) => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("Token");
  let userId = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    } catch (e) {
      console.error("Failed to decode token:", e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // Emit the message via socket
    if (socket) {
      socket.emit("sendMessage", {
        conversationId,
        content: message,
        senderId: userId,
      });
    }

    // Clear the input field and play send sound
    setMessage("");
    // sendSound.play(); // Play sound when sending a message

    // Dispatch the backend call
    dispatch(sendMessage({ senderId: userId, receiverId, content: message }))
      .unwrap()
      .catch((err) => {
        console.error("Failed to send message:", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-3 border-t bg-white flex items-center">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className={`ml-2 p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none ${
          message.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={message.trim() === ""}>
        <FiSend size={20} />
      </button>
    </form>
  );
};

export default MessageInput;
