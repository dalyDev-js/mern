import MessageContainer from "../../Components/messages/MessageContainer";
// import Sidebar from "../../Components/sidebar-chat/SidebarChat";

import SidebarChat from "../../Components/sidebar-chat/SidebarChat";

const Chat = () => {
  return (
    <div className="flex h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SidebarChat className="w-[20%]" />
      <MessageContainer className="w-[80%]" />
    </div>
  );
};

export default Chat;
