import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchEngineerByEngineerId } from "../../redux/slices/engineersSlice";

const Profile = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { serviceId } = state || {};
  const dispatch = useDispatch();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [overview, setOverview] = useState("");
  const [profilePic, setProfilePic] = useState("/images/unknown.jpg");
  const [certifications, setCertifications] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEngineerDetails = async () => {
      try {
        if (id) {
          const engineerResponse = await dispatch(
            fetchEngineerByEngineerId(id)
          ).unwrap();

          setFullName(engineerResponse?.user?.fullName || "Unknown Engineer");
          setSkills(engineerResponse?.skills || []);
          setEducation(
            engineerResponse?.education?.title ||
              "No education details available"
          );
          setProfilePic(engineerResponse?.user?.profilePic || profilePic);
          setOverview(engineerResponse?.overview || "No overview available");
          setCertifications(engineerResponse?.certificates || []);
          setPortfolios(engineerResponse?.portfolios || []);

          setDataLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load engineer details:", err);
      }
    };

    fetchEngineerDetails();
  }, [dispatch, id]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-16 p-10 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center space-x-6">
          <img
            src={profilePic}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border-4 border-amber-400 shadow-lg"
          />
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {fullName}
            </h1>
            {/* <p className="text-sm text-gray-500">
              Giza, Egypt - 6:51 PM local time
            </p> */}
            <p className="mt-2 text-lg text-amber-600">Available for hire</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {/* Conditionally render the "Hire Me" button only if serviceId is present */}
          {serviceId && (
            <Link
              to={`/hiring/${serviceId}/${id}`}
              className="px-8 py-2 bg-amber-300 text-black rounded-full shadow-lg hover:bg-amber-500 transition w-full sm:w-auto">
              Hire Me
            </Link>
          )}
          <button className="px-4 py-2 bg-white border border-amber-400 text-amber-400 rounded-full shadow-lg hover:bg-gray-100 transition w-full sm:w-auto">
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Overview</h2>
        <p className="text-gray-600 text-justify leading-relaxed">{overview}</p>
      </div>

      {/* Skills */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Skills</h2>
        <ul className="flex flex-wrap gap-4">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-amber-200 text-black rounded-full shadow-sm">
                {skill}
              </li>
            ))
          ) : (
            <li>No skills provided</li>
          )}
        </ul>
      </div>

      {/* Education */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Education</h2>
        <p className="text-gray-600">{education}</p>
      </div>

      {/* Certifications */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certifications.length > 0 ? (
            certifications.map((cert, index) => (
              <div
                key={index}
                onClick={() => openModal(cert)}
                className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300">
                <img
                  src={cert.file}
                  alt={cert.name}
                  className="h-40 w-full object-cover"
                />
                <p className="p-4 text-center font-semibold text-gray-700">
                  {cert.name}
                </p>
              </div>
            ))
          ) : (
            <p>No certifications provided</p>
          )}
        </div>
      </div>

      {/* Portfolio */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {portfolios.length > 0 ? (
            portfolios.map((item, index) => (
              <div
                key={index}
                onClick={() => openModal(item)}
                className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <p className="p-4 text-center font-semibold text-gray-700">
                  {item.title}
                </p>
              </div>
            ))
          ) : (
            <p>No portfolio items available</p>
          )}
        </div>
      </div>

      {/* Modal for certificates/portfolio */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}>
          <div
            className="bg-white rounded-lg p-6 shadow-lg relative max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}>
              <i className="fas fa-times text-2xl"></i>
            </button>
            <h3 className="text-2xl font-semibold mb-4">
              {selectedItem.name || selectedItem.title}
            </h3>
            <img
              src={selectedItem.file || selectedItem.image}
              alt={selectedItem.name || selectedItem.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
