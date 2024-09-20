import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.status >= 400) {
        const errorMessage = data.err || JSON.stringify(data);
        throw new Error(errorMessage);
      }
      localStorage.removeItem("user-state");
      setAuthUser(null);
      toast.success("Logged out!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
