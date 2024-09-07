import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function SignIn() {
  const [apiResponse, setApiResponse] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(15, "You cannot enter more than 15 characters"),
  });

  const handleLogin = async (formValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        formValues
      );
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("Token", token);
        localStorage.setItem("User", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setApiResponse(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="w-11/12 sm:w-5/12 lg:w-3/12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl text-black font-medium text-center mb-6">Sign In</h2>
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
                <div className="flex items-center border-b-2 border-gray-300">
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your Email"
                            className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-800 text-sm">{formik.errors.email}</div>
                    )}

                    {/* Password Field */}
                    <div className="flex items-center border-b-2 border-gray-300">
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            placeholder="Enter a strong Password"
                            className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
                        />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-800 text-sm">{formik.errors.password}</div>
                    )}

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-yellow-300 w-full py-3 rounded-lg text-white hover:bg-black-200 transition duration-200"

                        >
                            {loading ? <i className="fa fa-spin fa-spinner"></i> : 'Sign In'}
                        </button>
                        {apiResponse && (
                            <div className='p-2 mt-2 text-sm text-red-800 rounded-lg bg-red-50 '>
                                <span className="font-medium">{apiResponse}</span>
                            </div>
                        )}
                    </div>
                    <div className='text-center'>
                        <Link to='/Register' className='text-sm text-black-500  hover:underline'>I don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
