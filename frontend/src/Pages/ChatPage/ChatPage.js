import React from "react";
import ChatList from "../../Components/Chat/ChatList";
import ChatWindow from "../../Components/Chat/ChatWindow";

const Chat = () => {
  return (
    <div className="flex flex-col md:flex-row  h-[75vh]  bg-gray-100 w-full overflow-hidden">
      {/* This container won't scroll */}
      <div className="md:w-1/3 lg:w-1/4 border-r border-gray-300 overflow-y-auto">
        {/* Scroll only in the conversation list if needed */}
        <ChatList />
      </div>

      <div className="md:w-2/3 lg:w-3/4 flex-1 flex flex-col h-[75vh]  ">
        {/* Removed the scrollbar for the chat window container */}
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
