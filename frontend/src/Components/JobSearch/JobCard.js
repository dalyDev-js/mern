import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

function JobCard({
  jobId,
  title,
  description,
  postedTime,
  budget,
  skills,
  level,
  createdAt,
}) {
  const [liked, setLiked] = useState(false);

  const handleToggle = () => {
    setLiked(!liked);
  };
  console.log("Job ID:", jobId);

  // Calculate the time ago based on the createdAt field
  const timeAgo = moment(createdAt).fromNow();

  return (
    <Link
      to={`/job-details/${jobId}`}
      state={{ title, description, budget, skills, level, createdAt }}>
      {/* border border-solid */}
      <article className="flex justify-between items-start p-5 bg-white hover:bg-slate-100 rounded-md  border-neutral-300">
        <div className="grow-[2]">
          <div className="first-part  flex items-center justify-between">
            <h3 className="job-title mb-1 text-xl font-semibold text-black">
              {title}
            </h3>
            <i
              className={`text-xl ${
                liked
                  ? "fa-solid fa-heart cursor-pointer text-red-300"
                  : "fa-regular fa-heart text-amber-300 cursor-pointer"
              }`}
              onClick={handleToggle}></i>
          </div>
          <div className="mx-2 mb-12">
            <span className="flex  gap-2 mb-2">
              <svg
                class="w-5 h-5 text-neutral-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-neutral-400 text-sm">{timeAgo}</span>
            </span>
            <p className="job-description mb-2.5 text-gray-500">
              {description}
            </p>
            <span className="flex gap-2 ">
              {/* text-gray-800 */}
              <svg
                class="w-6 h-6 text-amber-300 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                />
              </svg>
              <p className="text-sm mb-3 text-gray-900">
                Fixed-price - {level} - Est. Budget:
                <span className="job-price "> {budget} $</span>
              </p>
            </span>
            <div className="skills flex gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill p-1 px-3 text-sm rounded-xl bg-gray-100">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <hr className="solid" />
        </div>
      </article>
    </Link>
  );
}

export default JobCard;
