// ProfileEducation.js
import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import react-hot-toast

function ProfileEducation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationTitle, setEducationTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [educationData, setEducationData] = useState(null);

  // Validation error states
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Fetch education details on component mount
  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const token = localStorage.getItem("Token"); // Ensure token key matches
      const userData = localStorage.getItem("User");
      if (!token || !userData) {
        toast.error("User not authenticated.");
        return;
      }
      const user = JSON.parse(userData);
      const response = await axios.get(
        `http://localhost:8000/api/v1/engineer/education/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "ttttttttttttttttttttttt");
      setEducationData(response.data.education);
    } catch (error) {
      console.error("Error fetching education details:", error);
      toast.error("Failed to fetch education details.");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      // Reset form fields and errors when opening the modal
      setEducationTitle("");
      setStartDate("");
      setEndDate("");
      setTitleError("");
      setDateError("");
    }
  };

  // Validation functions
  const validateEducationTitle = (title) => {
    const regex = /^[A-Za-z\s]{5,}$/; // Only letters and spaces, min 5 characters
    return regex.test(title);
  };

  const validateDates = (start, end) => {
    if (!start || !end) return false;
    const startD = new Date(start);
    const endD = new Date(end);
    if (startD > endD) return false;
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Validate Education Title
    if (!validateEducationTitle(educationTitle)) {
      setTitleError(
        "Education title must be at least 5 characters long and contain only letters and spaces."
      );
      toast.error(
        "Education title must be at least 5 characters long and contain only letters and spaces."
      );
      hasError = true;
    } else {
      setTitleError("");
    }

    // Validate Dates
    if (!validateDates(startDate, endDate)) {
      setDateError("End date must be after start date.");
      toast.error("End date must be after start date.");
      hasError = true;
    } else {
      setDateError("");
    }

    // If there are validation errors, return early
    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("Token");
      const userData = localStorage.getItem("User");
      if (!token || !userData) {
        toast.error("User not authenticated.");
        setIsLoading(false);
        return;
      }
      const user = JSON.parse(userData);

      await axios.put(
        `http://localhost:8000/api/v1/engineer/addeducation/${user._id}`,
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
      toast.success("Education added successfully!");
      toggleModal();
      fetchEducation();
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("Failed to add education.");
    } finally {
      setIsLoading(false);
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
              <FaPlus />
            </button>
          </div>
          {/* Display education details */}
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

      {/* Modal for Adding Education */}
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
                    className={`bg-gray-50 border ${
                      titleError ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-amber-300 focus:border-amber-300 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500`}
                    placeholder="Enter your education title"
                    required
                  />
                  {titleError && (
                    <p className="text-red-500 text-sm mt-1">{titleError}</p>
                  )}
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
                    className={`bg-gray-50 border ${
                      dateError ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-amber-300 focus:border-amber-300 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500`}
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
                    className={`bg-gray-50 border ${
                      dateError ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-amber-300 focus:border-amber-300 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500`}
                    required
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-1">{dateError}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className={`text-white inline-flex items-center bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                <FaPlus className="me-1 -ml-1 w-5 h-5" />
                {isLoading ? "Adding..." : "Add Education"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileEducation;
