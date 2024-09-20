import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import { fetchAllServices } from "../../redux/slices/jobSlice";

function JobList() {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.job);

  // Dispatch the fetchAllServices thunk when the component mounts
  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  // Log the jobs only when the status is 'succeeded'
  useEffect(() => {
    if (status === "succeeded") {
      console.log("Fetched jobs:", jobs); // Log jobs to the console
    }
  }, [status, jobs]); // Trigger the log when status or jobs change

  return (
    <div className="flex flex-col gap-5 w-full">
      {status === "loading" && <p>Loading jobs...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        jobs.map((job, index) => (
          <JobCard
            key={job._id} // Use _id as the key
            jobId={job._id} // Pass jobId to JobCard
            title={job.title}
            description={job.description}
            budget={job.budget}
            skills={job.skills}
            level={job.level}
            createdAt={job.createdAt}
          />
        ))}
    </div>
  );
}

export default JobList;
