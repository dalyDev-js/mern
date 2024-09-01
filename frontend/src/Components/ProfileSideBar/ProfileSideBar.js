import React, { useState } from "react";
import { FaPen, FaPlus } from "react-icons/fa";

function ProfileSideBar() {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };

  return (
    <div>
      <div className="p-4 border rounded-lg bg-white w-full ">
        <div className="p-4 mb-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Promote with ads</h3>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p>Availability badge</p>
              <p className="text-gray-500">Off</p>
            </div>
            <button className="text-amber-500">
              <FaPen />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p>Boost your profile</p>
              <p className="text-gray-500">Off</p>
            </div>
            <button className="text-amber-500">
              <FaPen />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Video introduction</h3>
          <button className="text-amber-500 border border-amber-500 rounded-full p-1">
            <FaPlus />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Hours per week</h3>
            <button className="text-amber-500 border border-amber-500 rounded-full p-1">
              <FaPen />
            </button>
          </div>
          <p className="text-gray-600">More than 30 hrs/week</p>
          <p className="text-gray-500">No contract-to-hire preference set</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Languages</h3>
            <div className="flex space-x-2">
              <button className="text-amber-500 border border-amber-500 rounded-full p-1">
                <FaPlus />
              </button>
              <button
                className="text-amber-500 border border-amber-500 rounded-full p-1"
                onClick={toggleLanguageModal} // Open modal on click
              >
                <FaPen />
              </button>
            </div>
          </div>
          <p className="text-gray-600">English: Conversational</p>
          <p className="text-gray-600">Arabic: Native or Bilingual</p>
        </div>
      </div>

      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Select Language and Proficiency
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Language
              </label>
              <select className="block w-full p-2 border border-gray-300 rounded-lg">
                <option>English</option>
                <option>Arabic</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Proficiency Level
              </label>
              <select className="block w-full p-2 border border-gray-300 rounded-lg">
                <option>Beginner</option>
                <option>Conversational</option>
                <option>Fluent</option>
                <option>Native or Bilingual</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={toggleLanguageModal}
              >
                Cancel
              </button>
              <button className="bg-amber-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSideBar;
