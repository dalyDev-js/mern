import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyJobs, deleteJob } from "../../redux/slices/jobSlice";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../../Components/deleteModal/DeleteConfirmationModal";
import { useLoading } from "../../utils/LoadingContext";
import { jwtDecode } from "jwt-decode";
import { fetchClientById } from "../../redux/slices/clientSlice";

export default function MyJobsPosts() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const { setIsLoading } = useLoading();
  // Select jobs and status from Redux state
  const [jobs, setJobs] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  // Fetch jobs when component mounts
  useEffect(() => {
    const loadMyJobs = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("Token");
        if (token) {
          const decodedToken = jwtDecode(token); // Decode token to get clientId
          const clientId = decodedToken.id;

          // Fetch the client's jobs using the clientId
          const [myJobResoponse] = await Promise.all([
            dispatch(fetchMyJobs(clientId)),
          ]);
          setJobs(myJobResoponse?.payload);
          console.log(myJobResoponse);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyJobs();
  }, [dispatch, setIsLoading]);

  // Handle loading and error states
  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
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
    <div className="my-jobs-posts px-14 p-8 h-screen">
      {/* checkkkkkk it */}

      {/* w-3/5 */}
      <div className="posts  ">
        {/* <p className="text-3xl font-semibold mx-10 my-20">My Job Posts</p> */}
        {jobs.length === 0 ? (
          // <div className=" flex items-center justify-center my-30">
          //   <div className="shadow-sm w-1/2 bg-gray-50   flex flex-col items-center justify-center h-1/2 rounded-lg p-10 py-16">
          //     <div className="text-center">
          //       <span className="flex">
          //         <svg
          //           class="w-8 h-8 text-gray-800 mr-4"
          //           aria-hidden="true"
          //           xmlns="http://www.w3.org/2000/svg"
          //           width="24"
          //           height="24"
          //           fill="none"
          //           viewBox="0 0 24 24"
          //         >
          //           <path
          //             stroke="currentColor"
          //             stroke-linecap="round"
          //             stroke-linejoin="round"
          //             stroke-width="2"
          //             d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          //           />
          //         </svg>

          //         <p className="text-2xl md:text-3xl font-medium   mb-4">
          //           No job posts found
          //         </p>
          //       </span>
          //     </div>
          //   </div>
          // </div>
          <div className=" w-full flex items-center justify-center my-60  ">
            <div className="text-center ">
              <span className="flex">
                <svg
                  class="w-8 h-8 text-gray-800 mr-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <p className="text-2xl md:text-3xl font-medium   mb-4">
                  No job posts found
                </p>
              </span>
            </div>
          </div>
        ) : (
          jobs.map((job) => (
            // checkkk
            <>
              <div className="posts  ">
                <p className="text-3xl font-semibold mx-10 my-20">
                  My Job Posts
                </p>
                {/*checkkk  */}
                <div
                  key={job._id} // Ensure each job has a unique key
                  className="job w-full flex mt-5 p-7 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-lg"
                >
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
                          className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="view-proposals w-1/4">
                    <Link to={`/job-proposals/${job._id}`}>
                      <button className="view w-full font-semibold p-2 rounded-md text-white bg-amber-300 hover:bg-amber-600">
                        <i className="text-amber-100 fa-solid fa-eye"></i>{" "}
                        {job.proposals?.length || 0} Proposals
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(job._id)}
                      className="view mt-4 w-full font-semibold p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                    >
                      <i className="text-amber-100 fa-solid fa-trash"></i>{" "}
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            </>
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
