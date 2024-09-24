import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";

function ProfilePortfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("published");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token for authentication
      const userData = localStorage.getItem("User");
      const user = JSON.parse(userData);

      const response = await axios.get(
        `http://localhost:8000/api/v1/portfolios/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data.portfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file); // Append the image file

    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("User");
      const user = JSON.parse(userData);

      const response = await axios.post(
        `http://localhost:8000/api/v1/portfolios/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Portfolio added successfully!");
      toggleModal();
      // Clear form fields
      setTitle("");
      setDescription("");
      setUrl("");
      setFile(null);
      // Refresh the list of projects
      fetchProjects();
    } catch (error) {
      console.error("Error adding portfolio:", error);
      alert("Failed to add portfolio.");
    }
  };

  // Handle delete project
  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("User");
      const user = JSON.parse(userData);

      await axios.delete(
        `http://localhost:8000/api/v1/portfolios/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Portfolio deleted successfully!");
      // Refresh the list of projects
      fetchProjects();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      alert("Failed to delete portfolio.");
    }
  };

  return (
    <div>
      <div className="p-4 border rounded-lg border-gray-300 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Portfolio</h2>
          <button
            className="text-amber-500 border border-amber-500 rounded-full p-1"
            onClick={toggleModal}
          >
            <FaPlus className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`mr-4 pb-2 ${
              activeTab === "published"
                ? "border-b-2 border-green-500 text-amber-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("published")}
          >
            Published
          </button>
        </div>

        <div>
          {activeTab === "published" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-6 relative">
                  <img
                    src={project.image} // Adjust the path based on your backend
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-green-500">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Project
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="absolute top-50 right-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No drafts available</p>
          )}
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
                Add a new project portfolio
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

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Your Title"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Project Description"
                    required
                  ></textarea>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="file"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <FaPlus className="mr-1 -ml-1 w-5 h-5" />
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePortfolio;
