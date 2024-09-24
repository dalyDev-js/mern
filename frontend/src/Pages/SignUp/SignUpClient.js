import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/slices/authSlice"; // Update the path as necessary
import { useNavigate, Link } from "react-router-dom";

export default function SignUpClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .matches(
        /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
        "Only alphabetic characters and one space are allowed"
      )
      .min(3, "Full Name must be at least 3 characters")
      .max(30, "You cannot enter more than 30 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "You cannot enter more than 20 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "You cannot enter more than 20 characters"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    terms: Yup.bool().oneOf([true], "Please agree to the terms and conditions"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      gender: "",
      country: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true); // Show loading screen
      const formData = { ...values, role: "client" };
      const result = await dispatch(signUp(formData));

      let isMounted = true;
      if (!result.payload?.error) {
        setTimeout(() => {
          if (isMounted) {
            resetForm(); // Clear form inputs on successful submission
            setSuccessMessage("Account created successfully!"); // Show success message
            navigate("/signin"); // Redirect to sign-in page
          }
          setIsLoading(false); // Hide loading screen after navigation
        }, 3000); // 3-second delay
      } else {
        setIsLoading(false); // Hide loading screen on error
        setSuccessMessage(""); // Reset success message in case of an error
      }

      return () => {
        isMounted = false;
      };
    },
  });

  const handleCheckboxChange = (e) => {
    formik.setFieldValue("terms", e.target.checked);
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      <p className="ml-4">Loading...</p>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-16">
      <div className="bg-white w-full max-w-3xl min-h-[650px] p-16 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-center mb-10">
          Sign up as Client
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-10">
            {/* Full Name Input */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Full Name"
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="absolute text-red-500 text-sm mt-2 left-2">
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  {formik.errors.fullName}
                </div>
              )}
            </div>

            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Username"
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="absolute text-red-500 text-sm mt-2 left-2">
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  {formik.errors.username}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="absolute text-red-500 text-sm mt-2 left-2">
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  {formik.errors.email}
                </div>
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
                placeholder="Password"
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="absolute text-red-500 text-sm mt-2 left-2">
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                name="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              {formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm && (
                  <div className="absolute text-red-500 text-sm mt-2 left-2">
                    <svg
                      class="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    {formik.errors.passwordConfirm}
                  </div>
                )}
            </div>

            {/* Gender Input */}
            <div className="relative">
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              >
                <option value="" label="Select your gender" />
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="absolute text-red-500 text-sm mt-2 left-2">
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  {formik.errors.gender}
                </div>
              )}
            </div>

            {/* Country Input */}
            <div className="relative">
              <select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-11/12 p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              >
                <option value="" label="Select your country" />
                <option value="Egypt">Egypt</option>
                <option value="USA">USA</option>
                <option value="UAE">UAE</option>
                {/* Add more countries as necessary */}
              </select>
              {formik.touched.country && formik.errors.country && (
                <div className="absolute text-red-500 text-sm mt-2 left-2">
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>{" "}
                  {formik.errors.country}
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-8 ">
            <label className="flex items-center space-x-2  ">
              <input
                type="checkbox"
                className="text-amber-300 border focus:border-amber-300 focus:ring-amber-300 "
                name="terms"
                checked={formik.values.terms}
                onChange={handleCheckboxChange}
              />
              <span>Agree to the terms and conditions</span>
            </label>
            {formik.touched.terms && formik.errors.terms && (
              <div className="text-red-500 text-sm mt-2">
                <svg
                  class="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>{" "}
                {formik.errors.terms}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-300 hover:bg-amber-400 text-black py-3 px-4 rounded-lg mt-4"
            disabled={loading || isLoading}
          >
            {loading || isLoading ? (
              <i className="fa fa-spin fa-spinner"></i>
            ) : (
              "Create Client Account"
            )}
          </button>

          {error && <div className="text-red-800 text-sm mt-4">{error}</div>}
          {successMessage && (
            <div className="text-green-500 text-sm mt-4 font-semibold">
              {successMessage} Please{" "}
              <Link to="/signin" className="text-blue-500 hover:underline">
                login
              </Link>{" "}
              to continue.
            </div>
          )}

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
