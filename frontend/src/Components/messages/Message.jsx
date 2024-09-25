import { useAuthContext } from "../../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleColor = fromMe
    ? "chat-bubble bg-blue-500 text-white"
    : "chat-bubble bg-grauy-500 text-white";
  // const shakeClass = message.shouldShake ? "shake"
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user Avatar" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleColor}`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 itmes-center text-black">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
