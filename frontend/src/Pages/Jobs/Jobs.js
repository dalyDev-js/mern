import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import JobCard from "../../Components/JobSearch/JobCard.js";
import { fetchAllServices } from "../../redux/slices/jobSlice";
import Sidebar from "../../Components/Sidebar/Sidebar.js";
import { fetchEngineerById } from "../../redux/slices/engineersSlice.js";
import { jwtDecode } from "jwt-decode";

function JobSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [engineerSkills, setEngineerSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const jobsPerPage = 10;

  // Fetch all jobs and engineer's skills when the component mounts
  useEffect(() => {
    // Fetch jobs
    dispatch(fetchAllServices()).then((response) => {
      if (response.payload) {
        setJobs(response.payload); // Set the jobs directly from response
      }
    });

    // Extract engineer ID from token and fetch their skills
    const token = localStorage.getItem("Token");
    if (token) {
      const decoded = jwtDecode(token);
      const engineerId = decoded.id; // Assuming the ID is inside the token
      dispatch(fetchEngineerById(engineerId)).then((response) => {
        if (response.payload) {
          setEngineerSkills(response.payload.skills); // Set engineer's skills
        }
      });
    }
  }, [dispatch]);

  // Filter jobs based on the search query and engineer's skills
  const filteredJobs = jobs
    .filter((job) => {
      const searchMatch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const skillMatch =
        sortOption === "Best Matches" && engineerSkills.length > 0
          ? job.skills.some((skill) =>
              engineerSkills.includes(skill.toLowerCase())
            )
          : true;

      return searchMatch && skillMatch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "Most Recent":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "Best Matches":
          return 0; // Default for Best Matches
        case "Budget Low to High":
          return a.budget - b.budget;
        case "Budget High to Low":
          return b.budget - a.budget;
        case "Time Old to New":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "Time New to Old":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Handle search query input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle page change with arrows
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pb-8 items-center mt-10">
      <div className="jobs-page w-full lg:w-4/5 mx-auto px-8 flex flex-col lg:flex-row gap-2">
        <div className="left-content w-full lg:w-2/3 ">
          <div className="big-label w-full p-6 rounded-lg shadow-lg bg-amber-300 text-black h-60 mb-4 mt-4 ">
            <p className="text-black text-2xl">
              Rise to the top of the client's list
            </p>
            <p className="text-black lg:text-3xl w-2/3 m:text-xl m:text-white">
              Boosted Proposals deliver 10x more earnings on ad spend
            </p>
            <button className="mt-7 bg-white rounded-md p-2 px-5">
              Boost Now
            </button>
          </div>

          {/* Search Bar and Sorting Options */}
          <form className="flex gap-2.5 mb-5 w-full flex-wrap">
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
              <option value="Best Matches">Best Matches</option>
              <option value="Most Recent">Most Recent</option>
              <option value="Budget Low to High">Budget Low to High</option>
              <option value="Budget High to Low">Budget High to Low</option>
              <option value="Time Old to New">Time Old to New</option>
              <option value="Time New to Old">Time New to Old</option>
            </select>

            <button
              type="button"
              className="font px-5 py-2.5 text-white bg-amber-400 hover:bg-amber-500 rounded border-white border-[none] font-[bold]">
              Search
            </button>
          </form>

          <p className="text-2xl my-5 font-medium">Jobs you might like</p>

          {/* Job List */}
          <div className="flex flex-col gap-5 w-full">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
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

          {/* Pagination with Arrow Icons */}
          <div className="pagination mt-8 flex justify-center items-center space-x-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 bg-white border rounded-full h-12 w-12 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-black"
              }`}>
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-amber-300 text-white"
                    : "bg-white text-black"
                } mx-1 p-2 rounded-full h-12 w-12 border border-gray-300 transition-all`}>
                {index + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 bg-white border rounded-full h-12 w-12 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-black"
              }`}>
              {">"}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="right-content w-full lg:w-1/3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
