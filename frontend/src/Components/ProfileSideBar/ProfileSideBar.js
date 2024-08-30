import React from "react";
import { FaPen, FaPlus } from "react-icons/fa";

function ProfileSideBar() {
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
              <button className="text-amber-500 border border-amber-500 rounded-full p-1">
                <FaPen />
              </button>
            </div>
          </div>
          <p className="text-gray-600">English: Conversational</p>
          <p className="text-gray-600">Arabic: Native or Bilingual</p>
        </div>

        <div>
          <h3 className="font-semibold">Verifications</h3>
        </div>
      </div>
    </div>
  );
}

export default ProfileSideBar;
