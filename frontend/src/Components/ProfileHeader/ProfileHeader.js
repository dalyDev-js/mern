import React, { useState } from "react";
import { FaCheckCircle, FaPen, FaShareAlt } from "react-icons/fa";
import avatar from "../../assets/Profile_avatar_placeholder_large.png";

function ProfileHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div
              className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
              onClick={toggleModal}>
              <FaPen className="text-sm text-amber-500" />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold flex items-center">
              Your Name
              <FaCheckCircle className="text-blue-500 ml-2" />
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-amber-500 text-white px-4 py-2 rounded">
            Profile settings
          </button>
          <div className="flex items-center text-amber-500 cursor-pointer">
            <FaShareAlt className="mr-1" />
            <span>Share</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload Profile Picture</h2>
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input">
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p className="mt-1 text-sm text-gray-500" id="file_input_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={toggleModal}>
                Cancel
              </button>
              <button className="bg-amber-500 text-white px-4 py-2 rounded">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
