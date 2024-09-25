import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearError } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function SignUpEngineer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const { loading, error } = useSelector((state) => state.auth);

  // Clear errors on component mount
  useEffect(() => {
    dispatch(clearError()); // Clear any previous errors when the component mounts
  }, [dispatch]);

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
      const formData = { ...values, role: "engineer" };
      const result = await dispatch(signUp(formData)); // Dispatching the signUp action

      if (!result.payload?.error) {
        setSuccessMessage("Account created successfully!");
        setTimeout(() => {
          resetForm();
          navigate("/signin");
        }, 3000); // Redirect to signin after success
      }
    },
  });

  const handleCheckboxChange = (e) => {
    formik.setFieldValue("terms", e.target.checked);
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      <p className="ml-4">Loading...</p>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-16">
      <div className="bg-white w-full max-w-3xl min-h-[650px] p-16 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-center mb-10">
          Sign up as Freelancer
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 space-y-4 md:space-y-0">
            {/* Full Name Input */}
            <div className="relative w-full h-20">
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              <label
                htmlFor="fullName"
                className={`absolute left-4 text-gray-500 transition-all transform origin-left pointer-events-none ${
                  formik.values.fullName
                    ? "top-0 -translate-y-6 scale-75"
                    : "top-4"
                } peer-focus:top-0 peer-focus:-translate-y-6 peer-focus:scale-75`}>
                Full Name
              </label>
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="absolute text-red-500 text-sm left-2">
                  {formik.errors.fullName}
                </div>
              )}
            </div>

            {/* Username Input */}
            <div className="relative w-full h-20">
              <input
                id="username"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              <label
                htmlFor="username"
                className={`absolute left-4 transition-all transform origin-left pointer-events-none ${
                  formik.values.username
                    ? "top-0 -translate-y-6 scale-75"
                    : "top-4"
                } peer-focus:top-0 peer-focus:-translate-y-6 peer-focus:scale-75`}>
                Username
              </label>
              {formik.touched.username && formik.errors.username && (
                <div className="absolute text-red-500 text-sm left-2">
                  {formik.errors.username}
                </div>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="relative w-full mt-6 h-20">
            <input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="peer w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
            />
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all transform origin-left pointer-events-none ${
                formik.values.email ? "top-0 -translate-y-6 scale-75" : "top-4"
              } peer-focus:top-0 peer-focus:-translate-y-6 peer-focus:scale-75`}>
              Email
            </label>
            {formik.touched.email && formik.errors.email && (
              <div className="absolute text-red-500 text-sm left-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-6">
            {/* Password Input */}
            <div className="relative w-full h-20">
              <input
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all transform origin-left pointer-events-none ${
                  formik.values.password
                    ? "top-0 -translate-y-6 scale-75"
                    : "top-4"
                } peer-focus:top-0 peer-focus:-translate-y-6 peer-focus:scale-75`}>
                Password
              </label>
              {formik.touched.password && formik.errors.password && (
                <div className="absolute text-red-500 text-sm left-2">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full h-20">
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300"
              />
              <label
                htmlFor="passwordConfirm"
                className={`absolute left-4 transition-all transform origin-left pointer-events-none ${
                  formik.values.passwordConfirm
                    ? "top-0 -translate-y-6 scale-75"
                    : "top-4"
                } peer-focus:top-0 peer-focus:-translate-y-6 peer-focus:scale-75`}>
                Confirm Password
              </label>
              {formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm && (
                  <div className="absolute text-red-500 text-sm left-2">
                    {formik.errors.passwordConfirm}
                  </div>
                )}
            </div>
          </div>

          {/* Gender and Country Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 mt-6">
            {/* Gender Input */}
            <div className="relative w-full h-20">
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300">
                <option value="" label="Select your gender" />
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute left-4 top-0 -translate-y-6 scale-75 text-gray-500 transition-all transform origin-left pointer-events-none">
                Gender
              </label>
              {formik.touched.gender && formik.errors.gender && (
                <div className="absolute text-red-500 text-sm left-2">
                  {formik.errors.gender}
                </div>
              )}
            </div>

            {/* Country Input */}
            <div className="relative w-full h-20">
              <select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-amber-300 focus:ring-amber-300">
                <option value="" label="Select your country" />
                <option value="Egypt">Egypt</option>
                <option value="USA">USA</option>
                <option value="UAE">UAE</option>
              </select>
              <label
                htmlFor="country"
                className="absolute left-4 top-0 -translate-y-6 scale-75 text-gray-500 transition-all transform origin-left pointer-events-none">
                Country
              </label>
              {formik.touched.country && formik.errors.country && (
                <div className="absolute text-red-500 text-sm left-2">
                  {formik.errors.country}
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-amber-300 border focus:border-amber-300 focus:ring-amber-300"
                name="terms"
                checked={formik.values.terms}
                onChange={handleCheckboxChange}
              />
              <span>Agree to the terms and conditions</span>
            </label>
            {formik.touched.terms && formik.errors.terms && (
              <div className="text-red-500 text-sm mt-2">
                {formik.errors.terms}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-300 hover:bg-amber-400 text-black py-3 px-4 rounded-lg mt-4"
            disabled={loading}>
            {loading ? (
              <i className="fa fa-spin fa-spinner"></i>
            ) : (
              "Create Freelancer Account"
            )}
          </button>

          {/* Display error messages */}
          {error && (
            <div className="text-red-500 text-m mt-4 text-center">{error}</div>
          )}

          {/* Display success message */}
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
