import { TiMessages } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../redux/slices/userSlice";

function NotChatSelected() {
  const [authUser, setAuthUser] = useState(null); // Local state for auth user
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

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-600 font-semibold flex flex-col items-center gap-2">
        <p>Welcome, {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}

export default NotChatSelected;
