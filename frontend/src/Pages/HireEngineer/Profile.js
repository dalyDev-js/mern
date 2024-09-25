import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom"; // Import useLocation to get the passed state
import { fetchEngineerByEngineerId } from "../../redux/slices/engineersSlice";

const Profile = () => {
  const { id } = useParams(); // Get the engineer ID from the URL params
  const { state } = useLocation(); // Access the state passed via Link
  const { serviceId } = state || {}; // Extract serviceId from state
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState("");
  const [overview, setOverview] = useState("");
  const [profilePic, setProfilePic] = useState("/images/unknown.jpg");

  useEffect(() => {
    const fetchEngineerDetails = async () => {
      try {
        if (id) {
          const response = await dispatch(
            fetchEngineerByEngineerId(id)
          ).unwrap();
          setFullName(response?.user?.fullName || "Unknown Engineer");
          setSkills(response?.skills || []);
          setEducation(
            response?.education?.title || "No education details available"
          );
          setProfilePic(response?.user?.profilePic || profilePic);
          setOverview(response?.overview || "No overview available");
          setDataLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load engineer details:", err);
      }
    };

    fetchEngineerDetails();
  }, [dispatch, id]);

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-20 p-6 bg-white rounded-3xl border shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border-2 border-amber-300"
          />
          <div className="ml-4">
            <h1 className="text-xl font-semibold">{fullName}</h1>
            <p className="text-gray-600">Giza, Egypt - 6:51 pm local time</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Use serviceId passed from state to build the URL */}
          <Link
            to={`/hiring/${serviceId}/${id}`}
            className="px-10 py-2 bg-amber-300 hover:bg-amber-400 text-black rounded-md">
            Hire
          </Link>
          <button className="px-4 py-2 text-amber-300 border hover:text-amber-400 hover:border-amber-400 border-amber-300 rounded-md">
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div className="mt-6">
        <hr className="solid mb-8" />
        <h2 className="text-lg font-semibold">Overview</h2>
        <p>{overview}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Skills</h2>
        <ul className="list-disc list-inside">
          {skills.length > 0 ? (
            skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills provided</li>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Education</h2>
        <p>{education}</p>
      </div>
    </div>
  );
};

export default Profile;
