import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../Components/JobSearch/JobCard.js";
import { fetchAllServices } from "../../redux/slices/jobSlice";
import SearchBar from "../../Components/JobSearch/SearchBar.js";
import Sidebar from "../../Components/Sidebar/Sidebar.js";

export function JobList() {
  const dispatch = useDispatch();

  // Access the jobs and loading state from Redux
  const { jobs, status, error } = useSelector((state) => state.job);

  // Dispatch the fetchAllServices thunk when the component mounts
  useEffect(() => {
    dispatch(fetchAllServices());
    console.log("Fetched jobs after fetchAllServices:", jobs);
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated jobs in state:", jobs);
  }, [jobs]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {status === "loading" && <p>Loading jobs...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        jobs.map((job, index) => (
          <JobCard
            key={job._id}
            jobId={job._id}
            title={job.title}
            budget={job.budget}
            skills={job.skills}
            description={job.description}
            level={job.level}
            createdAt={job.createdAt} // Pass createdAt to JobCard
          />
        ))}
    </div>
  );
}

function JobSearch() {
  return (
    // <div className=" pb-8 items-center  mt-10">
    //   {/* w-3/5  */}
    //   <div className="jobs-page px-20 mx-10 flex gap-2">
    //     {/* w-2/3 */}
    //     <div className="left-content w-2/3">
    //       <div className="big-label w-full p-6 rounded-lg shadow-lg  bg-amber-300  text-black h-60 mb-4 mt-4  ">
    //         <p className="text-black text-2xl">
    //           Rise to the top of the client's list
    //         </p>
    //         <p className="text-black text-3xl w-2/3">
    //           Boosted Proposals deliver 10x more earnings on ad spend
    //         </p>
    //         <button className="mt-7  bg-amber-300 rounded-md p-2 px-5">
    //           Boost Now
    //         </button>
    //       </div>

    //       <SearchBar />
    //       {/* iconnnnn jobs */}
    //       <p className="text-2xl my-5 py-5 px-5 font-medium rounded-lg bg-gray-100  ">
    //         <span className="flex">
    //           <svg
    //             class="w-6 h-6 text-gray-800 dark:text-white"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             fill="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M17 20v-5h2v6.988H3V15h1.98v5H17Z" />
    //             <path d="m6.84 14.522 8.73 1.825.369-1.755-8.73-1.825-.369 1.755Zm1.155-4.323 8.083 3.764.739-1.617-8.083-3.787-.739 1.64Zm3.372-5.481L10.235 6.08l6.859 5.704 1.132-1.362-6.859-5.704ZM15.57 17H6.655v2h8.915v-2ZM12.861 3.111l6.193 6.415 1.414-1.415-6.43-6.177-1.177 1.177Z" />
    //           </svg>
    //         </span>
    //         Jobs you might Like
    //       </p>

    //       <hr />
    //       <JobList />
    //     </div>
    //     <div className="right-content w-1/3">
    //       <Sidebar />
    //     </div>
    //   </div>
    // </div>

    // grid
    <div className="pb-8 items-center mt-10">
      <div className="jobs-page px-20 mx-10 grid grid-cols-4 gap-2">
        {/* Left Content - 3/4 of the screen */}
        <div className="left-content col-span-3">
          <div className="big-label w-full p-6 rounded-lg shadow-lg bg-amber-300 text-black h-60 mb-4 mt-4">
            <p className="text-black text-2xl">
              Rise to the top of the client's list
            </p>
            <p className="text-black text-3xl w-2/3">
              Boosted Proposals deliver 10x more earnings on ad spend
            </p>
            <button className="mt-7 bg-amber-300 rounded-md p-2 px-5">
              Boost Now
            </button>
          </div>

          <SearchBar />

          <p className="text-2xl my-5 py-5 px-5 font-medium rounded-lg bg-gray-50">
            <span className="flex gap-2">
              <span className="flex">
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 20v-5h2v6.988H3V15h1.98v5H17Z" />
                  <path d="m6.84 14.522 8.73 1.825.369-1.755-8.73-1.825-.369 1.755Zm1.155-4.323 8.083 3.764.739-1.617-8.083-3.787-.739 1.64Zm3.372-5.481L10.235 6.08l6.859 5.704 1.132-1.362-6.859-5.704ZM15.57 17H6.655v2h8.915v-2ZM12.861 3.111l6.193 6.415 1.414-1.415-6.43-6.177-1.177 1.177Z" />
                </svg>
              </span>
              Jobs you might Like
            </span>
          </p>

          <hr />
          <JobList />
        </div>

        {/* Right Content (Sidebar) - 1/4 of the screen */}
        <div className="right-content col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
