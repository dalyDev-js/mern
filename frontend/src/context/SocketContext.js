// src/context/SocketContext.js

import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useDispatch } from "react-redux";
import { receiveMessage } from "../redux/slices/chatSlice"; // Adjust the path as needed

// Create the Socket Context
export const SocketContext = createContext();

// Create the Socket Provider component
export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("Token"); // Adjust the key if different
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    // Decode the token to get userId
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return;
    }

    const userId = decodedToken.id; // Adjust based on your token structure

    if (!userId) {
      console.error("User ID not found in token");
      return;
    }

    // Initialize Socket.IO client with authentication token
    const newSocket = io("http://localhost:8000", {
      // Replace with your backend URL
      auth: {
        token, // Send the JWT token for authentication
      },
      query: {
        userId, // Optional: Send userId if needed
      },
    });

    setSocket(newSocket);

    // Listen for connection
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Listen for disconnection
    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    // Listen for new messages
    newSocket.on("newMessage", (message) => {
      console.log("New message received:", message);
      dispatch(receiveMessage(message)); // Dispatch action to Redux store
    });

    // Handle connection errors
    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      // Optionally, dispatch an action or show a notification
    });

    // Cleanup on unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
