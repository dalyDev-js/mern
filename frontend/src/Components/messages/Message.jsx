import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../redux/slices/userSlice";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

function Message({ message }) {
  const [authUser, setAuthUser] = useState(null); // Local state for auth user
  const { selectedConversation } = useConversation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      // Fetch user data using the ID from token
      dispatch(fetchUserById(userId)).then((action) => {
        setAuthUser(action.payload); // Assuming the user data is returned in payload
      });
    }
  }, [dispatch]);

  if (!authUser) {
    return null; // Return null or a loader while authUser is being fetched
  }

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleColor = fromMe
    ? "chat-bubble bg-blue-500 text-white"
    : "chat-bubble bg-gray-500 text-white"; // Fixed typo from "grauy" to "gray"

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user Avatar" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleColor}`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
