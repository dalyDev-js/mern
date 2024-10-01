import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchConversations,
  selectConversation,
} from "../../redux/slices/chatSlice";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for receiverId from the URL
import { jwtDecode } from "jwt-decode";

const ChatList = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const { receiverId } = useParams(); // Get receiverId from the URL

  const { conversations, loadingConversations, error, selectedConversation } =
    useSelector((state) => state.chat);

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

  useEffect(() => {
    // Fetch all conversations when component mounts
    dispatch(fetchConversations({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (receiverId && conversations.length > 0) {
      const conversationWithReceiver = conversations.find((conv) =>
        conv.participants.some((user) => user._id === receiverId)
      );
      if (conversationWithReceiver) {
        dispatch(selectConversation(conversationWithReceiver));

        // Optionally, join the conversation room via Socket.IO
        if (socket) {
          socket.emit("joinRoom", {
            conversationId: conversationWithReceiver._id,
          });
        }
      }
    }
  }, [receiverId, conversations, dispatch, socket]);

  const handleSelectConversation = (conversation) => {
    dispatch(selectConversation(conversation));

    const otherParticipant = conversation.participants.find(
      (user) => user._id !== userId
    );

    if (otherParticipant && otherParticipant._id) {
      navigate(`/chat/${otherParticipant._id}`);
    }

    if (socket) {
      socket.emit("joinRoom", { conversationId: conversation._id });
    }
  };

  if (loadingConversations) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-500">Loading conversations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-red-500">Error loading conversations: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b bg-white">
        <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {conversations.length === 0 ? (
            <li className="px-6 py-4 text-gray-500">
              No conversations found. Start chatting!
            </li>
          ) : (
            conversations.map((conv) => {
              const otherParticipant = conv.participants.find(
                (user) => user._id !== userId
              );

              const isSelected =
                selectedConversation && selectedConversation._id === conv._id;

              return (
                <li
                  key={conv._id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                    isSelected ? "bg-gray-100" : ""
                  }`}>
                  <div className="flex items-center px-4 py-3">
                    <img
                      src={
                        otherParticipant?.profilePic ||
                        "https://robohash.org/default.png"
                      }
                      alt={otherParticipant?.fullName}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-gray-800 truncate">
                        {otherParticipant?.fullName}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage
                          ? conv.lastMessage.content
                          : "No messages yet."}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap pl-2">
                      {conv.lastMessage
                        ? new Date(
                            conv.lastMessage.timestamp
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
