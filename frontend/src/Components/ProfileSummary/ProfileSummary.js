import React from 'react'
import { FaLink, FaPen, FaPlus } from 'react-icons/fa'

function ProfileSummary() {
  return (
    <div>
        <div className="flex justify-between items-start p-4 border-t border-gray-300 bg-white">
            {/* Left Section */}
            <div className="flex flex-col w-1/3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">View profile</h2>
                    <div className="flex space-x-2">
                        <button className="text-green-500 border border-green-500 rounded-full p-1">
                            <FaPlus />
                        </button>
                        <button className="text-green-500 border border-green-500 rounded-full p-1">
                            <FaPen />
                        </button>
                    </div>
                </div>
                <div className="flex items-center mt-2">
                    <span className="bg-blue-600 text-white text-sm rounded-full px-2 py-1">DRAFT</span>
                    <span className="ml-2 text-gray-600">Full Stack Development</span>
                </div>
                <a href="#" className="text-green-500 mt-2">All work</a>
            </div>

            {/* Middle Section */}
            <div className="flex flex-col w-1/3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">MERN Stack Developer</h2>
                    <button className="text-green-500 border border-green-500 rounded-full p-1">
                        <FaPen />
                    </button>
                </div>
                <p className="text-gray-600 mt-2">
                    I am a MERN Stack Developer, my main service is developing the whole project from scratch or as per the client request. I can maintain existing projects as well. With 2 years of development expertise, my priority is to deliver the client's requirements on time with the best quality.
                </p>
            </div>

            {/* Right Section */}
            <div className="flex flex-col w-1/4 items-end">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold">$10.00/hr</h2>
                    <button className="text-green-500 border border-green-500 rounded-full p-1">
                        <FaPen />
                    </button>
                    <button className="text-green-500 border border-green-500 rounded-full p-1">
                        <FaLink />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileSummary