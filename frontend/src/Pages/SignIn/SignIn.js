import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Validation schema with password required
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required") // Adding password validation back
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password cannot be more than 15 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(signIn(values));

      if (!result.error) {
        // Add a 1-second delay for loading simulation
        setTimeout(() => {
          // Check the role and navigate accordingly
          const userRole = result.payload.user.role;
          if (userRole === "client") {
            navigate("/client");
          } else if (userRole === "engineer") {
            navigate("/jobs");
          } else {
            navigate("/"); // Fallback, in case role is something else
          }
        }, 1000); // 1 second delay
      }
    },
  });

  const handleInputStyle = "w-full p-4 border border-gray-300 rounded-lg"; // Consistent input style with SignUp
  const handleErrorStyle = "text-red-500 text-sm mt-2"; // Consistent error style

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Email"
                className={handleInputStyle}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={handleErrorStyle}>{formik.errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Password"
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
              className="w-full bg-yellow-300 text-white py-3 px-4 rounded-lg mt-4"
              disabled={loading}>
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
