import React from "react";
import JobCard from "./JobCard";

const jobsData = [
  {
    title: "Architecture Engineer Needed",
    budget: "$25",
    description:
      "We are seeking a talented Architecture Engineer to join our team...",
    postedTime: "Posted 2 hours ago",
    paymentType: "Hourly",
  },
  {
    title: "Civil Engineer ",
    budget: "$50",
    description: "Looking for an experienced...",
    postedTime: "Posted 5 hours ago",
    paymentType: "Hourly",
  },
  {
    title: "Land design required ",
    budget: "$120",
    description: "We need a skilled copywriter to create engaging content...",
    postedTime: "Posted 1 day ago",
    paymentType: "Fixed-Price",
  },
];

function JobList() {
  return (
    <div className="flex flex-col gap-5 w-full">
      {jobsData.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
}

export default JobList;
