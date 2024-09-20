import React, { useState, useEffect } from "react";
import { FaLink, FaPen, FaPlus } from "react-icons/fa";
import axios from "axios";

function ProfileSummary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [profileOverview, setProfileOverview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing profile data on component mount
  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // token from where ?
      const response = await axios.get(
        "http://localhost:8000/api/v1/engineers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setTitle(data.title || "");
      setProfileOverview(data.profileOverview || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      fetchProfile();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token"); // Adjust based on how you store tokens

    try {
      if (title) {
        await axios.post(
          "http://localhost:8000/api/v1/engineers/addtitle",
          { title },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (profileOverview) {
        await axios.post(
          "http://localhost:8000/api/v1/engineers/addoverview",
          { profileOverview },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Profile updated successfully!");
      toggleModal();
      fetchProfile(); 
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start p-4 border rounded-lg border-gray-300 bg-white">
        <div className="flex flex-col w-1/2">
          <div className="flex">
            <h2 className="text-lg font-semibold">{title || "Your Title"}</h2>
            <div className="flex items-center justify-between ml-3">
              <button
                onClick={toggleModal}
                className="text-amber-500 border border-amber-500 ml-3 rounded-full p-1"
              >
                <FaPen />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            {profileOverview || "Your Profile Overview"}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Your Profile
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleFormSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your Title"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="profileOverview"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Profile Overview
                  </label>
                  <textarea
                    id="profileOverview"
                    rows="4"
                    value={profileOverview}
                    onChange={(e) => setProfileOverview(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Profile Overview"
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                disabled={isLoading}
              >
                <FaPlus className="me-1 -ms-1 w-5 h-5" />
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSummary;
