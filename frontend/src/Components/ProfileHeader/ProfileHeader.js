import React from 'react'
import { FaCheckCircle, FaMapMarkerAlt, FaPen, FaShareAlt } from 'react-icons/fa'

function ProfileHeader() {
  return (
    <div>
        <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white">
            <div className="flex items-center">
                <div className="relative">
                    <img
                        src="path-to-your-profile-picture.jpg"
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1">
                        <FaPen className="text-sm text-amber-500" />
                    </div>
                </div>
                <div className="ml-4">
                    <h1 className="text-2xl font-bold flex items-center">
                        Mohamed
                        <FaCheckCircle className="text-blue-500 ml-2" />
                    </h1>
                    <p className="text-gray-500 flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        Cairo, Egypt – 5:05 pm local time
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="border border-ambsd-500 text-amber-500 px-4 py-2 rounded">
                    See public view
                </button>
                <button className="bg-amber-500 text-white px-4 py-2 rounded">
                    Profile settings
                </button>
                <div className="flex items-center text-amber-500 cursor-pointer">
                    <FaShareAlt className="mr-1" />
                    <span>Share</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileHeader