import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/authContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    email,
    password,
    passwordConfirm,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      email,
      password,
      passwordConfirm,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          passwordConfirm,
          gender,
        }),
      });

      const data = await res.json();
      if (res.status >= 400) {
        const errorMessage = data.message || JSON.stringify(data);
        throw new Error(errorMessage);
      }
      toast.success("Signup successful!");
      console.log(data);

      localStorage.setItem("user-state", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

const handleInputErrors = ({
  fullName,
  username,
  email,
  password,
  passwordConfirm,
  gender,
}) => {
  if (
    !fullName ||
    !username ||
    !email ||
    !password ||
    !passwordConfirm ||
    !gender
  ) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== passwordConfirm) {
    toast.error("Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error(" Password must be at least 6 character");
    return false;
  }

  return true;
};
