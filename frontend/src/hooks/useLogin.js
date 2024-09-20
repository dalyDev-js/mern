import { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status >= 400) {
        const errorMessage = data.message || JSON.stringify(data);
        throw new Error(errorMessage);
      }
      console.log(data);

      localStorage.setItem("user-state", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged In!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

const handleInputErrors = (email, password) => {
  if (!email || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
};
