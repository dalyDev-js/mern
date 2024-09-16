import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs, deleteJob } from "../../redux/slices/jobSlice";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../../Components/deleteModal/DeleteConfirmationModal";

export default function MyJobsPosts() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  // Select jobs and status from Redux state
  const { jobs = [], status, error } = useSelector((state) => state.job);

  // Fetch jobs when component mounts
  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch]);

  // Handle loading and error states
  if (status === "loading") {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error fetching jobs: {error.message || JSON.stringify(error)}</p>;
  }

  const handleDeleteClick = (jobId) => {
    setJobToDelete(jobId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteJob(jobToDelete));
    setIsModalOpen(false);
  };

  return (
    <div className="my-jobs-posts px-14 p-8">
      <div className="posts w-3/5">
        <p className="text-3xl font-semibold">My Job Posts</p>
        {jobs.length === 0 ? (
          <p>No job posts found</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id} // Ensure each job has a unique key
              className="job w-full flex mt-5 p-7 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-lg">
              <div className="job-data w-3/4">
                <p className="job-name text-2xl font-medium text-amber-700">
                  {job.title}
                </p>
                <p className="job-description w-4/5 text-gray-600 mt-2">
                  {job.description}
                </p>
                <div className="skills flex gap-2 mt-5">
                  {job.skills?.map((skill, index) => (
                    <div
                      key={index} // Unique key for each skill
                      className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="view-proposals w-1/4">
                <Link to={`/job-proposals/${job._id}`}>
                  <button className="view w-full font-semibold p-2 rounded-md text-white bg-amber-500 hover:bg-amber-600">
                    <i className="text-amber-100 fa-solid fa-eye"></i>{" "}
                    {job.proposals?.length || 0} Proposals
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(job._id)}
                  className="view mt-4 w-full font-semibold p-2 rounded-md text-white bg-red-500 hover:bg-red-600">
                  <i className="text-amber-100 fa-solid fa-trash"></i> Delete
                  Post
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
}
