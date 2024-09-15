import React, { useState } from "react";
import { Link } from "react-router-dom";

function JobCard({ title, description, postedTime, budget }) {
  const [liked, setLiked] = useState(false);

  const handleToggle = () => {
    setLiked(!liked);
  };

  return (
    <Link
      to={{
        pathname: "/job-details",
      }}
      state={{ title, description, budget }}
    >
      <article className="flex justify-between items-start p-5 bg-white hover:bg-slate-100 rounded-md border border-solid border-neutral-300">
        <div className="grow-[2]">
          <span className="text-neutral-400">{postedTime}</span>

          <div className="first-part flex items-center justify-between">
            <h3 className="job-title mb-1 text-xl font-semibold text-amber-600">
              {title}
            </h3>
            <i
              className={`text-xl ${
                liked
                  ? "fa-solid fa-heart cursor-pointer text-red-600"
                  : "fa-regular fa-heart text-amber-600 cursor-pointer"
              }`}
              onClick={handleToggle}
            ></i>
          </div>

          <p className="text-sm mb-3 text-gray-500">
            Fixed-price - Intermediate - Est. Budget:
            <span className="job-price">{budget}</span>
          </p>
          <p className="job-description mb-2.5 text-gray-500">{description}</p>
          <div className="skills flex gap-3">
            <div className="skill p-1 px-3 text-sm rounded-xl bg-slate-300">
              JavaScript
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default JobCard;
