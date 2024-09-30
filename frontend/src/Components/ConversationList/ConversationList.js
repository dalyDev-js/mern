import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ConversationList = ({
  conversations,
  activeConversation,
  setActiveConversation,
}) => {
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);

  // Decode token to determine the user's role
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserRole(decodedToken.role); // Assuming role is included in the token
    }
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation._id}
            className={`p-2 cursor-pointer ${
              activeConversation && activeConversation._id === conversation._id
                ? "bg-blue-100"
                : ""
            }`}
            onClick={() => setActiveConversation(conversation)}>
            {/* Filter participants based on the logged-in user's role */}
            {conversation.participants
              .filter(
                (participant) =>
                  (loggedInUserRole === "client" &&
                    participant.role === "engineer") ||
                  (loggedInUserRole === "engineer" &&
                    participant.role === "client")
              )
              .map((participant) => participant.fullName || "Unknown Name")
              .join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
