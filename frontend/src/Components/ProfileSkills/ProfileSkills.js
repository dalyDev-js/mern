import React from 'react'
import { FaPen } from 'react-icons/fa'

function ProfileSkills() {
    const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']

  return (
    <div>
        <div className="p-4 border-t border-gray-300 bg-white">
            <div className="flex flex-start items-center mb-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                <button className="text-amber-500 border border-amber-500 ml-3 rounded-full p-1">
                    <FaPen />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProfileSkills