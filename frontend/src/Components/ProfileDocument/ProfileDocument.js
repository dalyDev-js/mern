import React, { useState, useEffect } from "react";
import { FaPen, FaPlus } from "react-icons/fa";
import axios from "axios";

function ProfileDocument() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [certifications, setCertifications] = useState([]);

  // Fetch certifications on component mount
  // useEffect(() => {
  //   fetchCertifications();
  // }, []);

  // const fetchCertifications = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       "http://localhost:8000/api/v1/certificates",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setCertifications(response.data.certificates);
  //   } catch (error) {
  //     console.error("Error fetching certifications:", error);
  //   }
  // };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", "testName");

    formData.append("file", file);

    try {
      const token = localStorage.getItem("Token");
      await axios.post("http://localhost:8000/api/v1/vdocuments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Card added successfully!");
      toggleModal();
    } catch (error) {
      console.log("Error adding card:", error);
      alert("Failed to add card.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start p-4 border rounded-lg border-gray-300 bg-white">
        <div className="flex flex-col w-1/2">
          <div className="flex items-center justify-start">
            <h2 className="text-lg font-semibold">Engineer's syndicate card</h2>
            <button
              onClick={toggleModal}
              className="text-amber-500 border ml-3 border-amber-500 rounded-full p-1"
            >
              <FaPen />
            </button>
          </div>
          {/* Display Syndicate card */}
          <div className="mt-2">
            {certifications.length > 0 ? (
              <ul>
                {certifications.map((cert, index) => (
                  <li key={index} className="mb-2">
                    <span className="text-gray-600">{cert.name}</span>
                    <a
                      href={`http://localhost:8000/uploads/${cert.file}`}
                      className="text-blue-500 ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View syndicate card
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cards available</p>
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
                Add your certificates
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
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="certificateFile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Syndicate Card
                  </label>
                  <input
                    type="file"
                    name="certificateFile"
                    id="certificateFile"
                    onChange={handleFileChange}
                    className="block w-100% text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              >
                <FaPlus className="me-1 -ms-1 w-5 h-5" />
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDocument;
