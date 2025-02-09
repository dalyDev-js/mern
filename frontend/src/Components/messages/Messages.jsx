import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";


function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    } , 100)
  } , [messages])
  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message  message={message} />
        </div>
      ))}


    {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}

    {!loading &&messages.length === 0 && (
      <p className="text-center text-red-500">Send a Message and start conversation</p>
    )}
    
  </div>
  );
}

export default Messages;
