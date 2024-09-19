import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import axios from 'axios';

function ProfileSkills() {
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkills, setNewSkills] = useState('');

  // useEffect(() => {
  //   fetchSkills();
  // }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:8000/api/v1/engineers/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(response.data.skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setNewSkills(skills.join(', ')); 
  };

  const handleSkillsChange = (e) => {
    setNewSkills(e.target.value);
  };

  const handleSaveSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      const skillsToAdd = newSkills.split(',').map(skill => skill.trim()); // Convert string to array
      await axios.post(
        'http://localhost:8000/api/v1/engineers/addskill',
        { skillsToAdd },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSkills(skillsToAdd); 
      setIsEditing(false); 
      alert('Skills updated successfully!');
    } catch (error) {
      console.error('Error updating skills:', error);
      alert('Failed to update skills.');
    }
  };

  return (
    <div>
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <button
            className="text-amber-500 border border-amber-500 ml-3 rounded-full p-1"
            onClick={toggleEditing}
          >
            <FaPen />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {!isEditing ? (
            skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))
          ) : (
            <textarea
              className="w-full p-2 border rounded"
              value={newSkills}
              onChange={handleSkillsChange}
              placeholder="Enter skills separated by commas"
            />
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveSkills}
            >
              Save
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={toggleEditing}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSkills;
