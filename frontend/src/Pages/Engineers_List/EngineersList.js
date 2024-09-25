import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEngineers } from "../../redux/slices/engineersSlice";
import { Link } from "react-router-dom";

function EngineersList() {
  const dispatch = useDispatch();

  // Access engineers, loading status, and error from Redux
  const { engineers, status, error } = useSelector(
    (state) => state.engineerlist
  );
  // console.log(engineers.map((engineer) => engineer._id));

  // Fetch all engineers when the component mounts
  useEffect(() => {
    dispatch(fetchAllEngineers());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-20 py-10 h-screen my-10 ">
      {/* Title */}
      <h1 className="text-4xl font-medium  text-amber-300 mb-3 mt-10">
        Hire the best Engineers professionals
      </h1>

      {/* Description */}
      <p className="text-lg mb-6">
        Check out Prospect Lists professionals with the skills you need for your
        next job.
      </p>

      {/* Show loading, error or engineers list */}
      {status === "loading" && <p>Loading engineers...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineers.map((engineer, index) => (
            <div
              key={index}
              className="border rounded-lg pb-5 p-3 flex flex-col items-center text-center shadow-sm relative">
              {/* Engineer Rate  */}
              <p className="absolute text-gray-600 top-4 right-2 text-sm px-2 py-1 ">
                {engineer.user.fullname}
              </p>
              <br></br>
              {/* Engineer Image */}
              <img
                src={
                  engineer.user.profilePic === ""
                    ? "/images/unkown.jpg"
                    : engineer.user.profilePic
                }
                alt={engineer.user.fullName}
                className="w-24  object-cover h-24 rounded-full"
              />
              {/* Engineer Name */}
              <h2 className="text-l mt-1 ">{engineer.user.fullName}</h2>
              {/* Role */}
              <p className="text-gray-500 text-xs">{engineer.user.role}</p>
              {/* Rating */}
              <p className="text-xs mt-3 text-gray-600 flex items-center">
                <span className="ml-1" aria-hidden="true">
                  {/* icon star */}
                  <svg
                    className="w-4 h-4 pr-1 text-amber-400 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </span>
                completed jobs: {engineer?.activeContracts?.length}
              </p>

              {/* Skills */}
              <div className="mt-2 flex w-full flex-wrap items-center gap-1 justify-center mt-4">
                {engineer.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="flex gap-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full ">
                    {skill}
                  </span>
                ))}
              </div>
              {/* See More Button */}
              <button className="text-xs mt-4 bg-amber-300 text-black px-3 py-1 rounded-md hover:bg-amber-400">
                <Link to={`/engineer-details/${engineer._id}`}>See more</Link>
              </button>
              {/* console.log({`id:${engineer._id}`}); */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EngineersList;
