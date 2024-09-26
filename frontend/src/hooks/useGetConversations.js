import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [decodedId, setDecodedId] = useState("");

  useEffect(() => {
    const getConversations = async () => {
      const token = localStorage.getItem("Token");
      const decodedId = jwtDecode(token).id;
      setLoading(true);
      setDecodedId(decodedId);
      console.log(decodedId);
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/users/getUsersSidebar",
          { id: decodedId }
        );
        const data = await res.json();

        console.log("user for sidebar:", data);

        if (res.status >= 400) {
          const errorMessage = data.message || JSON.stringify(data.message);
          throw new Error(errorMessage);
        }
        setConversations(data.data.filteredusers);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;
