import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import io from "socket.io-client";
import { fetchUserById } from "../redux/slices/userSlice";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Parse user ID from the token (Assuming JWT)
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      // Dispatch the action to fetch user data
      dispatch(fetchUserById(userId)).then((action) => {
        const authUser = action.payload; // Assuming action returns the user data

        if (authUser) {
          const socket = io("http://localhost:5000", {
            query: {
              userId: authUser._id,
            },
          });

          setSocket(socket);

          // Listen for online users from the server
          socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
          });

          return () => socket.close();
        }
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
