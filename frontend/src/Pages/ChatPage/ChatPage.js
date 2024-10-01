// src/components/Chat/Chat.js

import React from "react";
import ChatList from "../../Components/Chat/ChatList";
import ChatWindow from "../../Components/Chat/ChatWindow";

const Chat = () => {
  return (
    <div className="flex flex-col md:flex-row h-[90vh] bg-gray-100 w-full">
      {/* Conversation list with overflow only for the list */}
      <div className="md:w-1/3 lg:w-1/4 border-r border-gray-300 overflow-y-auto">
        <ChatList />
      </div>

      {/* Chat window with no outer scrolling */}
      <div className="md:w-2/3 lg:w-3/4 flex-1 flex flex-col h-full">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
