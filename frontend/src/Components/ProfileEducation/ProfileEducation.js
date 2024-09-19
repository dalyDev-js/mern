import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import axios from "axios";

function ProfileEducation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationTitle, setEducationTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [educationData, setEducationData] = useState(null);

  // Fetch education details on component mount
  // useEffect(() => {
  //   fetchEducation();
  // }, []);

  const fetchEducation = async () => {
    try {
      const token = localStorage.getItem("token"); // token from where ?
      const response = await axios.get("http://localhost:8000/api/v1/engineers/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEducationData(response.data.education); 
    } catch (error) {
      console.error("Error fetching education details:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      await axios.put(
        "http://localhost:8000/api/v1/engineers/addeducation",
        {
          title: educationTitle,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Education added successfully!");
      toggleModal();
      fetchEducation(); 
    } catch (error) {
      console.error("Error adding education:", error);
      alert("Failed to add education.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start p-4 border rounded-lg border-gray-300 bg-white">
        <div className="flex flex-col w-1/2">
          <div className="flex items-center justify-start">
            <h2 className="text-lg font-semibold">Education</h2>
            <button
              onClick={toggleModal}
              className="text-amber-500 border ml-3 border-amber-500 rounded-full p-1"
            >
              <FaPen />
            </button>
          </div>
          <div className="mt-2">
            {educationData ? (
              <div>
                <p>
                  <strong>{educationData.title}</strong>
                </p>
                <p>
                  {new Date(educationData.startDate).toLocaleDateString()} -{" "}
                  {new Date(educationData.endDate).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>No education details available</p>
            )}
          </div>
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
                Add Your Education
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
                    htmlFor="educationTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Education Title
                  </label>
                  <input
                    type="text"
                    name="educationTitle"
                    id="educationTitle"
                    value={educationTitle}
                    onChange={(e) => setEducationTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your education title"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              >
                <FaPlus className="me-1 -ms-1 w-5 h-5" />
                Add Education
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileEducation;
