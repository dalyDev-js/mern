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
        fullName: Yup.string()
            .required('Full Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(25, 'You cannot enter more than 25 characters'),
        username: Yup.string()
            .required('User Name is required and must include 3 numbers at the end')
            .min(5, 'Name must be at least 5 characters')
            .max(25, 'You cannot enter more than 25 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'You cannot enter more than 20 characters'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm your password'),
        gender: Yup.string().required('Gender is required'),
        profilePic: Yup.mixed().required('Profile picture is required')
    });

    async function handleSignup(formValues) {
        setLoading(true);
        console.log(formValues);


        const response = await axios.post('http://localhost:8000/api/v1/auth/signup',formValues )
            
        console.log (response);
        setLoading(false);
        navigate('/login')
    }

    const formik = useFormik({
        initialValues: {
            fullName: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            gender: '',
            profilePic: ''
        },
        validationSchema,
        onSubmit: handleSignup,
    });

    return (
        <>
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
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formik.values.fullName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Full Name"
                                        onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                    {formik.touched.fullName && formik.errors.fullName && (
                                        <div className="text-red-800 text-sm">{formik.errors.fullName}</div>
                                    )}
                                <input
                                 type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="User Name"
                                 onInput={(e) => {
                             e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, '').replace(/(\d{3})\d+/, '$1');
                               }}
                             className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                         {formik.touched.username && formik.errors.username && (
                        <div className="text-red-800 text-sm">{formik.errors.username}</div>
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
                                name="passwordConfirm"
                                onChange={formik.handleChange}
                                value={formik.values.passwordConfirm}
                                onBlur={formik.handleBlur}
                                placeholder="Confirm password"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                                <div className="text-red-800 text-sm">{formik.errors.passwordConfirm}</div>
                            )}

                            <select
                                name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="" label="Select your gender" />
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && (
                                <div className="text-red-800 text-sm">{formik.errors.gender}</div>
                            )}

                            <input
                                type="file"
                                name="profilePic"
                                onChange={formik.handleChange}
                                value={formik.values.profilePic}
                                onBlur={formik.handleBlur}
                                placeholder="Work email address"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.profilePic && formik.errors.profilePic && (
                                <div className="text-red-800 text-sm">{formik.errors.profilePic}</div>
                            )}

                            <label className="flex items-center space-x-2">
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
        </>
    );
}
