import { useEffect, useState } from "react";
import { FaPen, FaCheckCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; // For extracting params from the route
import {
  fetchEngineerById,
  updateEngineerName,
  updateEngineerProfilePic,
} from "../../redux/slices/engineersSlice"; // Import relevant actions

function ProfileHeader() {
  const dispatch = useDispatch();
  const { id: engineerId } = useParams(); // Extract 'id' from route params
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null); // For storing the selected image file
  const [isLoading, setIsLoading] = useState(false); // For managing loading state

  // Get the selectedEngineer from Redux store
  const selectedEngineer = useSelector(
    (state) => state.engineerlist.selectedEngineer
  );

  // Set the initial values from the selectedEngineer
  const [fullName, setFullName] = useState("Your Name");
  const [avatar, setAvatar] = useState("avatar_url");

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
      setAvatar(selectedEngineer?.user?.profilePic || "avatar_url");
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

  const handleNameSave = async () => {
    try {
      setIsLoading(true);

      // Pass the correct data structure (an object with engineerId and fullName)
      await dispatch(updateEngineerName({ engineerId, fullName }));
      setIsNameModalOpen(false);
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Failed to update name.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleImageSave = async () => {
    try {
      setIsLoading(true);
      // Dispatch only the image file, not the form data
      await dispatch(
        updateEngineerProfilePic({ engineerId, profilePic: newAvatar })
      );
      setAvatar(URL.createObjectURL(newAvatar)); // Update the local avatar preview
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full"
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
              <FaCheckCircle className="text-blue-500 ml-2" />
            </h1>
            <div
              className="ml-2 bg-white border border-gray-300 rounded-full p-1 cursor-pointer"
              onClick={toggleNameModal}>
              <FaPen className="text-sm text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload Profile Picture</h2>
            <input
              type="file"
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

      {isNameModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Name</h2>
            <input
              type="text"
              value={fullName}
              onChange={handleNameChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
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
