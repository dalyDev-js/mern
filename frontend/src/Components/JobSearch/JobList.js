import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import { fetchAllServices } from "../../redux/slices/jobSlice";

function JobList() {
  const dispatch = useDispatch();

  // Access the jobs and loading state from Redux
  const { jobs, status, error } = useSelector((state) => state.job);

  // Dispatch the fetchMyJobs thunk when the component mounts
  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {status === "loading" && <p>Loading jobs...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        jobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            budget={job.budget}
            skills={job.skills}
            description={job.description}
            level={job.level}
          />
        ))}
    </div>
  );
}

export default JobList;
