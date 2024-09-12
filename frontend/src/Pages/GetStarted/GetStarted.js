import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function GetStarted() {
  const [isFreelancer, setIsFreelancer] = useState(true);
  const navigate = useNavigate();

  const handleFreelancerClick = () => {
    setIsFreelancer(true);
  };

  const handleClientClick = () => {
    setIsFreelancer(false);
  };

  const handleSignup = () => {
    if (isFreelancer) {
      navigate("/signup?role=freelancer");
      navigate("/register");
    } else {
      navigate("/signup?role=client");
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">
          Join as a client or freelancer
        </h2>
        <div className="flex flex-col sm:flex-row justify-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className={`py-4 px-6 rounded-lg w-full sm:w-48 font-semibold border ${
              !isFreelancer
                ? "bg-green-50 border-black-600 text-green-600"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={handleClientClick}
          >
            I'm a client, hiring for a project
          </button>
          <button
            className={`py-4 px-6 rounded-lg w-full sm:w-48 font-semibold border ${
              isFreelancer
                ? "bg-green-50 border-yellow-300 text-black-600"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={handleFreelancerClick}
          >
            I'm a freelancer, looking for work
          </button>
        </div>

        <button
          className="bg-yellow-300 text-white py-3 px-8 rounded-lg w-full sm:w-auto"
          onClick={handleSignup}
        >
          {isFreelancer ? "Apply as a Freelancer" : "Apply as a Client"}
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
