import React from 'react'
import { useState } from 'react';

function ProfilePortfolio() {
    const [activeTab, setActiveTab] = useState('published');

    const projects = [
        {
            title: "Project title",
            description: "Project description",
            image: "" 
        },
    ];
  return (
    <div>
         <div className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold ">Portfolio</h2>
                <button className="text-amber-500 border border-green-500 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="flex border-b border-gray-200 mb-4">
                <button
                    className={`mr-4 pb-2 ${activeTab === 'published' ? 'border-b-2 border-green-500 text-amber-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('published')}
                >
                    Published
                </button>
                <button
                    className={`pb-2 ${activeTab === 'drafts' ? 'border-b-2 border-green-500 text-amber-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('drafts')}
                >
                    Drafts
                </button>
            </div>

            <div>
                {activeTab === 'published' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-2" />
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-green-500">{project.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No drafts available</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default ProfilePortfolio