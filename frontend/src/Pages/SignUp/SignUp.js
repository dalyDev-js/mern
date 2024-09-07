import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
    const [apiResponse, setApiResponse] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(10, 'You cannot enter more than 10 characters'),
        lastName: Yup.string()
            .required('Last Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(10, 'You cannot enter more than 10 characters'),
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^(010|011|012)\d{8}$/, 'Enter a valid number, enter 11 numbers'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'You cannot enter more than 20 characters'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm your password'),
        gender: Yup.string().required('Gender is required'),
        country: Yup.string().required('Country is required'),
    });

    async function handleSignup(formValues) {
        setLoading(true);
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues);
            localStorage.setItem('Token', response.data.token);
            navigate('/');
        } catch (err) {
            setApiResponse(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            rePassword: '',
            gender: '',
            country: '',
            terms: false,
        },
        validationSchema,
        onSubmit: handleSignup,
    });

    const handleCheckboxChange = (e) => {
        formik.setFieldValue('terms', e.target.checked);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign up to hire talent</h2>
                <div className="flex flex-col space-y-3">
                    <button className="bg-black text-white py-2 px-4 rounded-lg">
                        Continue with Apple
                    </button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                        Continue with Google
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 text-gray-500">or</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex space-x-6">
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="First Name"
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="text-red-800 text-sm">{formik.errors.firstName}</div>
                                )}
                            </div>
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Last Name"
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="text-red-800 text-sm">{formik.errors.lastName}</div>
                                )}
                            </div>
                        </div>

                        <input
                            type="text"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            maxLength="11"
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                            placeholder="Enter phone number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="text-red-800 text-sm">{formik.errors.phone}</div>
                        )}

                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            placeholder="Work email address"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-800 text-sm">{formik.errors.email}</div>
                        )}

                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            placeholder="Password (8 or more characters)"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-800 text-sm">{formik.errors.password}</div>
                        )}

                        <input
                            type="password"
                            name="rePassword"
                            onChange={formik.handleChange}
                            value={formik.values.rePassword}
                            onBlur={formik.handleBlur}
                            placeholder="Confirm password"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        {formik.touched.rePassword && formik.errors.rePassword && (
                            <div className="text-red-800 text-sm">{formik.errors.rePassword}</div>
                        )}

                        <select
                            name="gender"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="" label="Select your gender" />
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                            <div className="text-red-800 text-sm">{formik.errors.gender}</div>
                        )}

                        <select
                            name="country"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.country}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="" label="Select your country" />
                            <option value="Egypt">Egypt</option>
                            <option value="USA">USA</option>
                            <option value="UAE">UAE</option>
                            <option value="France">France</option>
                            <option value="Canada">Canada</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Italy">Italy</option>
                            <option value="Spain">Spain</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                        </select>
                        {formik.touched.country && formik.errors.country && (
                            <div className="text-red-800 text-sm">{formik.errors.country}</div>
                        )}
                    </div>

                    <div className="mt-4 space-y-2">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={formik.values.terms} onChange={handleCheckboxChange} />
                            <span>Send me emails with tips on how to find talent that fits my needs.</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input type="checkbox" required checked={formik.values.terms} onChange={handleCheckboxChange} />
                            <span>
                                Yes, I understand and agree to the{" "}
                                <Link to="#" className="text-blue-500">Upwork Terms of Service</Link>, including the{" "}
                                <Link to="#" className="text-blue-500">User Agreement</Link> and{" "}
                                <Link to="#" className="text-blue-500">Privacy Policy</Link>.
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="w-full bg-yellow-300 text-white py-3 px-4 rounded-lg mt-4"
                            disabled={loading}
                        >
                            {loading ? <i className="fa fa-spin fa-spinner"></i> : 'Create my account'}
                        </button>
                        {apiResponse && (
                            <div className='p-2 text-sm text-red-800 rounded-lg bg-red-50 mt-2'>
                                <span className="font-medium">{apiResponse}</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <Link to="/signin" className="text-sm text-gray-500 hover:underline">
                            Already have an account? Log In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}