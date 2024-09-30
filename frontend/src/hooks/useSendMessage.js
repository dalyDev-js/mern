import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [decodedId, setDecodedId] = useState("");

  const sendMessage = async (message) => {
    let token = localStorage.getItem("Token");
    let decodedId = jwtDecode(token);
    setLoading(true);
    setDecodedId(decodedId);

    // Prepare the body for the POST request
    const requestBody = {
      message: message,
      senderId: decodedId,
    };

    // Log the request body before sending the request
    console.log("Request Body:", requestBody);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestBody), // Convert the body to JSON string
        }
      );

      const data = await res.json();
      if (res.status >= 400) {
        const errorMessage = data.message || JSON.stringify(data);
        throw new Error(errorMessage);
      }
      setMessages([...messages, data]);
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
