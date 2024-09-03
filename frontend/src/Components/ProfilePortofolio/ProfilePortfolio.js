import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function ProfilePortfolio() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('published')

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

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
                    <h2 className="text-2xl font-semibold">Portfolio</h2>
                    <button className="text-amber-500 border border-amber-500 rounded-full p-1" onClick={toggleModal}>
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

                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Project Title
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Your Title"
                                        required=""
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Profile Overview
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Profile Overview"
                                    ></textarea>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Upload file
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="block w-100% text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-amber-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default ProfilePortfolio;
