import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchEngineerById } from "../../redux/slices/engineersSlice";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "../../utils/LoadingContext";

export default function ProfileSkills() {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]); // Current skills from the backend
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const [inputValue, setInputValue] = useState(""); // New skill input value
  const [tags, setTags] = useState([]); // Skills shown as tags when editing
  const [errors, setErrors] = useState({ skills: "" }); // Validation errors
  const [dataLoaded, setDataLoaded] = useState(false); // For tracking if data is loaded
  const [engineerId, setEngineerId] = useState(null); // Store the engineer ID
  const { setIsLoading } = useLoading(); // Loading context to show/hide loading spinner

  // Fetch engineer and skills when component mounts
  useEffect(() => {
    const loadEngineerSkills = async () => {
      setIsLoading(true); // Set loading to true

      try {
        const token = localStorage.getItem("Token");
        if (token) {
          const decodedToken = jwtDecode(token); // Decode the token to get the user ID
          const id = decodedToken.id;
          setEngineerId(id); // Set the engineer ID in state

          // Fetch the engineer's details using their ID
          const response = await dispatch(fetchEngineerById(id));
          const engineerSkills = response?.payload?.skills; // Extract skills from response

          setSkills(engineerSkills); // Set the skills in state
          setTags(engineerSkills.map((skill) => ({ id: skill, text: skill }))); // Set the tags for editing
          setDataLoaded(true); // Mark data as loaded
        }
      } catch (error) {
        console.error("Failed to fetch engineer skills:", error);
      } finally {
        setIsLoading(false); // Hide the loading spinner
      }
    };

    loadEngineerSkills(); // Call the function to load engineer skills
  }, [dispatch, setIsLoading]);

  // Handle loading state
  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setErrors({ skills: "" });
  };

  // Add new skill
  const handleAddition = () => {
    if (inputValue.trim() && !tags.some((tag) => tag.text === inputValue)) {
      setTags([...tags, { id: inputValue, text: inputValue }]);
      setInputValue("");
      setErrors({ skills: "" });
    } else {
      setErrors({ skills: "Skill cannot be empty or duplicated." });
    }
  };

  // Remove a skill
  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Save updated skills to the backend
  const handleSaveSkills = async () => {
    try {
      const token = localStorage.getItem("Token");
      const skills = tags.map((tag) => tag.text); // Convert tags back to array of skill texts

      await axios.post(
        `http://localhost:8000/api/v1/engineer/addskill/${engineerId}`,
        { skillsToAdd: skills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSkills(skills); // Update displayed skills
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

  return (
    <div>
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <button
            className="text-amber-500 border border-amber-500 rounded-full p-2 cursor-pointer hover:bg-amber-200 focus:outline-none"
            onClick={toggleEditing}
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <FaPen size={16} />
          </button>
        </div>

        <div className="skill-input-container">
          {!isEditing ? (
            // Display skills as static tags when not editing
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-amber-300 text-black px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          ) : (
            <>
              {/* Input Section */}
              <div className="w-full flex items-center mb-4 mt-8">
                <div className="w-full">
                  <input
                    placeholder="Add new skill"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full rounded-md border p-2 outline-none border-gray-700 focus:ring-amber-400 focus:border-2 focus:border-amber-400"
                  />
                </div>
                <button
                  type="button"
                  className="ml-3 bg-amber-300 text-black px-4 py-2 rounded-md"
                  onClick={handleAddition}>
                  Add
                </button>
              </div>
              {errors.skills && <p className="text-red-500">{errors.skills}</p>}
              {/* Tags Section */}
              <div className="tags-list">
                {tags.map((tag, index) => (
                  <span
                    key={tag.id}
                    className="bg-amber-300 text-black p-2 rounded-md mr-2 mb-2 inline-flex items-center">
                    {tag.text}
                    <AiOutlineClose
                      className="ml-2 bg-black text-white rounded-full p-1 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </span>
                ))}
              </div>

              {/* Save and Cancel Buttons */}
              <div className="flex justify-end mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleSaveSkills}>
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={toggleEditing}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
