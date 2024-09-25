// ProfileHeader.js
import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchEngineerById,
  updateEngineerName,
  updateEngineerProfilePic,
} from "../../redux/slices/engineersSlice"; 
import { toast } from "react-hot-toast"; // Import react-hot-toast

function ProfileHeader() {
  const dispatch = useDispatch();
  const { id: engineerId } = useParams(); // Extract 'id' from route params
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null); // For storing the selected image file
  const [isLoading, setIsLoading] = useState(false); // For managing loading state
  const [nameError, setNameError] = useState(""); // For name validation error

  // Get the selectedEngineer from Redux store
  const selectedEngineer = useSelector(
    (state) => state.engineerlist.selectedEngineer
  );

  // Set the initial values from the selectedEngineer
  const [fullName, setFullName] = useState("Your Name");
  const [avatar, setAvatar] = useState("/images/unknown.jpg");

  useEffect(() => {
    if (engineerId) {
      // Fetch engineer details based on the id from the route params
      dispatch(fetchEngineerById(engineerId));
    }
  }, [dispatch, engineerId]);

  useEffect(() => {
    // Update avatar and full name once selectedEngineer is fetched
    if (selectedEngineer) {
      setFullName(selectedEngineer?.user?.fullName || "Your Name");
      setAvatar(selectedEngineer?.user?.profilePic || "/images/unknown.jpg");
    }
  }, [selectedEngineer]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNameModal = () => {
    setIsNameModalOpen(!isNameModalOpen);
  };

  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  // Validation function for the name
  const validateName = (name) => {
    const regex = /^[A-Za-z\s]{3,}$/; // Only letters and spaces, at least 3 characters
    return regex.test(name);
  };

  const handleNameSave = async () => {
    // Validate the name before submitting
    if (!validateName(fullName)) {
      setNameError(
        "Name must be at least 3 characters long and contain only letters and spaces."
      );
      toast.error(
        "Name must be at least 3 characters long and contain only letters and spaces."
      );
      return;
    } else {
      setNameError("");
    }

    try {
      setIsLoading(true);

      // Dispatch the updateEngineerName action
      await dispatch(updateEngineerName({ engineerId, fullName }));
      setIsNameModalOpen(false);
      toast.success("Name updated successfully!");
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Failed to update name.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleImageSave = async () => {
    if (!newAvatar) {
      toast.error("Please select an image to upload.");
      return;
    }

    try {
      setIsLoading(true);
      // Dispatch the updateEngineerProfilePic action
      await dispatch(
        updateEngineerProfilePic({ engineerId, profilePic: newAvatar })
      );
      setAvatar(URL.createObjectURL(newAvatar)); // Update the local avatar preview
      setIsModalOpen(false);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Profile Header Display */}
      <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={avatar || "/images/unknown.jpg"}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full"
            />
            <div
              className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
              onClick={toggleModal}>
              <FaPen className="text-sm text-amber-500" />
            </div>
          </div>
          <div className="ml-4 flex items-center">
            <h1 className="text-2xl font-bold flex items-center">
              {fullName}
            </h1>
            <div
              className="ml-2 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
              onClick={toggleNameModal}>
              <FaPen className="text-sm text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Profile Picture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload Profile Picture</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={toggleModal}>
                Cancel
              </button>
              <button
                className="bg-amber-500 text-white px-4 py-2 rounded"
                onClick={handleImageSave}
                disabled={isLoading}>
                {isLoading ? "Updating..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Name */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Name</h2>
            <input
              type="text"
              value={fullName}
              onChange={handleNameChange}
              className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 ${
                nameError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your Name"
              required
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={toggleNameModal}>
                Cancel
              </button>
              <button
                className="bg-amber-500 text-white px-4 py-2 rounded"
                onClick={handleNameSave}
                disabled={isLoading}>
                {isLoading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
