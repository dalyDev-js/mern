import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../Components/JobSearch/JobCard.js";
import { fetchAllServices } from "../../redux/slices/jobSlice";
import Sidebar from "../../Components/Sidebar/Sidebar.js";

function JobSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Best Matches");

  // Access the jobs and loading state from Redux
  const { jobs, status, error } = useSelector((state) => state.job);

  // Fetch all jobs when the component mounts
  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  // Filter and sort jobs based on the search query and sort option
  const filteredJobs = jobs
    .filter((job) => {
      return (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      if (sortOption === "Most Recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0; // Keep "Best Matches" as default for now
    });

  // Handle search query input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="pb-8 items-center mt-10">
      <div className="jobs-page w-4/5 mx-auto flex gap-2">
        <div className="left-content w-2/3">
          <div className="big-label w-full p-6 rounded-lg shadow-lg bg-amber-300 text-black h-60 mb-4 mt-4">
            <p className="text-black text-2xl">
              Rise to the top of the client's list
            </p>
            <p className="text-black text-3xl w-2/3">
              Boosted Proposals deliver 10x more earnings on ad spend
            </p>
            <button className="mt-7 bg-white rounded-md p-2 px-5">
              Boost Now
            </button>
          </div>

          {/* Search Bar */}
          <form className="flex gap-2.5 mb-5 w-full">
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2.5 rounded border border-solid border-neutral-300 grow-[2]"
            />
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="p-2.5 bg-white rounded border border-solid border-neutral-300">
              <option>Best Matches</option>
              <option>Most Recent</option>
            </select>
            <button
              type="button"
              className="px-5 py-2.5 text-white bg-amber-500 rounded border-white border-[none] font-[bold]">
              Search
            </button>
          </form>

          <p className="text-2xl my-5 font-medium">Jobs you might like</p>

          {/* Job List */}
          <div className="flex flex-col gap-5 w-full">
            {status === "loading" && <p>Loading jobs...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  jobId={job._id}
                  title={job.title}
                  budget={job.budget}
                  skills={job.skills}
                  description={job.description}
                  level={job.level}
                  createdAt={job.createdAt}
                />
              ))
            ) : (
              <p>No jobs found matching your search criteria.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="right-content w-1/3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
