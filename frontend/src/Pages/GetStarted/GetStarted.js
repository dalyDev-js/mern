import React from 'react';
import { Link } from 'react-router-dom';

export default function GetStarted() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg sm:p-12 md:p-16 lg:p-20">
        <h1 className="text-2xl font-semibold text-center mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
          Join as a client or freelancer
        </h1>
        <div className="flex mb-4 flex-col md:flex-row">
          <label className="flex-grow w-full sm:w-1/2 mx-2 mb-4 sm:mb-0">
            <input type="radio" name="role" className="hidden" />
            <div className="p-4 border rounded-lg text-center cursor-pointer hover:border-green-500 transition-colors duration-300 h-full">
              <div className="text-4xl mb-2">👤</div>
              <div className="font-medium">I'm a client, hiring for a project</div>
            </div>
          </label>
          <label className="flex-grow w-full sm:w-1/2 mx-2">
            <input type="radio" name="role" className="hidden" />
            <div className="p-4 border rounded-lg text-center cursor-pointer hover:border-green-500 transition-colors duration-300 h-full">
              <div className="text-4xl mb-2">👤</div>
              <div className="font-medium">I'm a freelancer, looking for work</div>
            </div>
          </label>
        </div>
        <Link to="/signup">
          <button className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg w-full cursor-pointer hover:bg-gray-400 transition-colors duration-300 sm:py-4 md:py-5 lg:py-6">
            Create Account
          </button>
        </Link>
        <div className="text-center mt-4 sm:text-lg md:text-xl lg:text-2xl">
          Already have an account?{' '}
          <Link to="/signin" className="text-green-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}