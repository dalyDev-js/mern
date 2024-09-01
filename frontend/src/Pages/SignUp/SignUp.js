import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [apiResponse, setApiResponse] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required')
        .min(4, "Name must be at least 4 characters")
        .max(20,"you cannot enter more than 20 characters"),
        phone: Yup.string()
        .required('Phone is required')
        .matches(/^(010|011|012)\d{8}$/, 'Enter a vaild number,enter number start with 010,011,012'),
        email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 5 characters')
            .max(20, 'You cannot enter more than 20 characters'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Enter your re-password'),
            
            idCard: Yup.string()
            .required('Enter your idCard')

    });

  async function handleSignup(formValues) {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        formValues
      );
      console.log(response?.data.token);
      localStorage.setItem("Token", response?.data.token);
      navigate("/");
    } catch (err) {
      console.log(err, "error");
      setApiResponse(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
            idCard:'',
        },
        validationSchema,
        onSubmit: handleSignup
    });

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="w-11/12 sm:w-5/12 lg:w-3/12 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl text-black font-medium text-center mb-6">Sign Up</h2>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    {/* Name Field */}
                    <div className="flex items-center border-b-2 border-gray-300">
                        <input
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            name="name"
                            onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')}
                            placeholder="Enter your Name"
                            className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
                        />
                        <div className="flex-none w-8 flex items-center justify-center">
                            <i className="fa-solid fa-user text-xl"></i>
                        </div>
                    </div>
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-800 text-sm">{formik.errors.name}</div>
                    )}

                    {/* Phone Field */}
                    <div className="flex items-center border-b-2 border-gray-300">
                        <input
                            type="tel"
                            name="phone"
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your Phone"
                            className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
                        />
                        <div className="flex-none w-8 flex items-center justify-center">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="text-red-800 text-sm">{formik.errors.phone}</div>
                    )}

          {/* Phone Field */}
          <div className="flex items-center border-b-2 border-gray-300">
            <input
              type="tel"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              placeholder="Enter your Phone"
              className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
            />
            <div className="flex-none w-8 flex items-center justify-center">
              <i className="fa-solid fa-phone"></i>
            </div>
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-800 text-sm">{formik.errors.phone}</div>
          )}

          {/* Email Field */}
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
            <div className="flex-none w-8 flex items-center justify-center">
              <i className="fa-solid fa-envelope text-xl"></i>
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-800 text-sm">{formik.errors.email}</div>
          )}

                    {/* Re-Password Field */}
                    <div className="flex items-center border-b-2 border-gray-300">
                        <input
                            type="password"
                            name="rePassword"
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your er-password"
                            className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
                        />
                        <div className="flex-none w-8 flex items-center justify-center">
                            <i className="fa-solid fa-lock text-xl"></i>
                        </div>
                    </div>
                    {formik.touched.rePassword && formik.errors.rePassword && (
                        <div className="text-red-800 text-sm">{formik.errors.rePassword}</div>
                    )}

                    
                   <div className="flex items-center border-b-2 border-gray-300">
                        <input
                            type="file"
                            onChange={formik.handleChange}
                            value={formik.values.idCard}
                            onBlur={formik.handleBlur}
                            name="idCard"
                            placeholder="Enter your idCard"
                            className="flex-grow p-2 bg-transparent outline-none placeholder-gray-400"
                        />
                        <div className="flex-none w-8 flex items-center justify-center">
                            <i className="fa-solid fa-user text-xl"></i>
                        </div>
                    </div>
                    {formik.touched.idCard && formik.errors.idCard && (
                        <div className="text-red-800 text-sm">{formik.errors.idCard}</div>
                    )}

                    {/* Submit Button */}
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-green-500 w-full py-3 rounded-lg text-white hover:bg-green-600 transition duration-200"
                        >
                            {loading ? <i className="fa fa-spin fa-spinner"></i> : 'Sign Up'}
                        </button>
                        {apiResponse && (
                            <div className='p-2 text-sm text-red-800 rounded-lg bg-red-50 mt-2'>
                                <span className="font-medium">{apiResponse}</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <Link to="/login" className="text-sm text-green-500 hover:underline">
                            Already have an account?
                        </Link>
                    </div>
                </form>

            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-green-500 w-full py-3 rounded-lg text-white hover:bg-green-600 transition duration-200">
              {loading ? <i className="fa fa-spin fa-spinner"></i> : "Sign Up"}
            </button>
            {apiResponse && (
              <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50 mt-2">
                <span className="font-medium">{apiResponse}</span>
              </div>
            )}
          </div>
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-green-500 hover:underline">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
