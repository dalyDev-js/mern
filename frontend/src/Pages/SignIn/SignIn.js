import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(30, "Password cannot be more than 15 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Show loading screen
      const result = await dispatch(signIn(values));

      let isMounted = true;

      if (!result.error) {
        setTimeout(() => {
          if (isMounted) {
            const userRole = result.payload.user.role;
            if (userRole === "client") {
              navigate("/client");
            } else if (userRole === "engineer") {
              navigate("/jobs");
            } else {
              navigate("/");
            }
          }
          setIsLoading(false); // Hide loading screen after navigation
        }, 3000); // 3-second delay
      } else {
        setIsLoading(false); // Hide loading screen on error
      }

      return () => {
        isMounted = false;
      };
    },
  });

  const handleInputStyle =
    "w-11/12 p-4 mx-10  border border-gray-300 rounded-lg bg-white focus:border-amber-300 focus:ring-amber-300";
  const handleErrorStyle = "text-red-500 text-sm mt-2 mx-12";

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      <p className="ml-4">Loading...</p>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl min-h-[500px]">
        <h2 className="text-2xl font-bold text-center mb-14 mt-8">Sign In</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                className={handleInputStyle}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={handleErrorStyle}>{formik.errors.email}</div>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                className={handleInputStyle}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={handleErrorStyle}>{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-1/2 bg-amber-300 hover:bg-amber-400 text-black py-3 px-4 rounded-lg mt-8"
              disabled={loading || isLoading}>
              {loading ? <i className="fa fa-spin fa-spinner"></i> : "Sign In"}
            </button>

            {error && (
              <div className="p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50">
                <span className="font-medium">{error}</span>
              </div>
            )}
          </div>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/get-started" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
