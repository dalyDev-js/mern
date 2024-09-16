import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axios from "axios";

// const jobsData = [
//   {
//     title: "Architecture Engineer Needed",
//     description:
//       "We are seeking a talented Architecture Engineer to join our team...",
//     postedTime: "Posted 2 hours ago",
//     paymentType: "Hourly",
//   },
//   {
//     title: "Civil Engineer ",
//     description: "Looking for an experienced...",
//     postedTime: "Posted 5 hours ago",
//     paymentType: "Hourly",
//   },
//   {
//     title: "Land design required ",
//     description: "We need a skilled copywriter to create engaging content...",
//     postedTime: "Posted 1 day ago",
//     paymentType: "Fixed-Price",
//   },
// ];

function JobList() {
  const [jobs, setJobs] = useState([]);

  // call API --> axios
  // Did Mount ==> []
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/services")
      .then((res) => {
        console.log(res.data.services);
        setJobs(res.data.services);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col gap-5 w-full">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          budget={job.budget}
          skills={job.skills}
        />
        // <JobCard key={index} {...job} />
      ))}
    </div>
  );
}

export default JobList;
