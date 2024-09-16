import React from "react";
import { Link } from "react-router-dom";

function EngineersList() {
  const engineers = [
    {
      name: "Mohamed",
      role: "Engineer Freelancer",
      rate: "$200/hr",
      rating: "4.4/5",
      jobs: "197 jobs",
      skills: ["Grant Proposal"],
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLVqYBaYdrjH3jcFd6Jof3gd8BofNnHh0-XA&s", // Replace with real image
    },
    {
      name: "Ahmed",
      role: "Engineer Freelancer",
      rate: "$140/hr",
      rating: "4.9/5",
      jobs: "181 jobs",
      skills: ["Lead Management"],
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-FI5Evhx7ZBcj_PFrc9IOwTTVfdm1qNqcvQ&s",
    },
    // , "Email List"
    {
      name: "Mahmoud",
      role: "Engineer Freelancer",
      rate: "$25/hr",
      rating: "4.2/5",
      jobs: "5 jobs",
      skills: ["Data Mining"],
      imgSrc:
        "https://www.esafety.gov.au/sites/default/files/styles/large/public/2019-07/protect_your_personal_information_0.jpg?itok=9WsxAHFo",
    },
    {
      name: "laila",
      role: "Engineer Freelancer",
      rate: "$10/hr",
      rating: "5.0/5",
      jobs: "91 jobs",
      skills: ["Administrative Support"],
      imgSrc:
        "https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/1624543756303-VS6884H3LCZMT2RET845/studio-headshot-personal-branding-photography-westport-connecticut.jpg",
    },

    {
      name: "Mohamed",
      role: "Engineer Freelancer",
      rate: "$200/hr",
      rating: "4.4/5",
      jobs: "197 jobs",
      skills: ["Grant Proposal"],
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLVqYBaYdrjH3jcFd6Jof3gd8BofNnHh0-XA&s", // Replace with real image
    },
    {
      name: "Ahmed",
      role: "Engineer Freelancer",
      rate: "$140/hr",
      rating: "4.9/5",
      jobs: "181 jobs",
      skills: ["Lead Management"],
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-FI5Evhx7ZBcj_PFrc9IOwTTVfdm1qNqcvQ&s",
    },
    // , "Email List"
    {
      name: "Mahmoud",
      role: "Engineer Freelancer",
      rate: "$25/hr",
      rating: "4.2/5",
      jobs: "5 jobs",
      skills: ["Data Mining"],
      imgSrc:
        "https://www.esafety.gov.au/sites/default/files/styles/large/public/2019-07/protect_your_personal_information_0.jpg?itok=9WsxAHFo",
    },
    {
      name: "laila",
      role: "Engineer Freelancer",
      rate: "$10/hr",
      rating: "5.0/5",
      jobs: "91 jobs",
      skills: ["Administrative Support"],
      imgSrc:
        "https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/1624543756303-VS6884H3LCZMT2RET845/studio-headshot-personal-branding-photography-westport-connecticut.jpg",
    },

    {
      name: "Mohamed",
      role: "Engineer Freelancer",
      rate: "$200/hr",
      rating: "4.4/5",
      jobs: "197 jobs",
      skills: ["Grant Proposal"],
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLVqYBaYdrjH3jcFd6Jof3gd8BofNnHh0-XA&s", // Replace with real image
    },
    {
      name: "Ahmed",
      role: "Engineer Freelancer",
      rate: "$140/hr",
      rating: "4.9/5",
      jobs: "181 jobs",
      skills: ["Lead Management"],
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-FI5Evhx7ZBcj_PFrc9IOwTTVfdm1qNqcvQ&s",
    },
    // , "Email List"
    {
      name: "Mahmoud",
      role: "Engineer Freelancer",
      rate: "$25/hr",
      rating: "4.2/5",
      jobs: "5 jobs",
      skills: ["Data Mining"],
      imgSrc:
        "https://www.esafety.gov.au/sites/default/files/styles/large/public/2019-07/protect_your_personal_information_0.jpg?itok=9WsxAHFo",
    },
    {
      name: "laila",
      role: "Engineer Freelancer",
      rate: "$10/hr",
      rating: "5.0/5",
      jobs: "91 jobs",
      skills: ["Administrative Support"],
      imgSrc:
        "https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/1624543756303-VS6884H3LCZMT2RET845/studio-headshot-personal-branding-photography-westport-connecticut.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-20 py-10">
      {/* Title */}
      <h1 className="text-4xl font-medium  text-amber-300 mb-3">
        Hire the best Engineers professionals
      </h1>

      {/* Description */}

      <p className="text-lg  mb-6">
        Check out Prospect Lists professionals with the skills you need for your
        next job.
      </p>

      {/* Hire Button */}
      <div className="mb-6">
        <button className="text-sm bg-amber-300 text-white px-3 py-2 rounded-md hover:bg-amber-400">
          Hire Freelancers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {engineers.map((engineer, index) => (
          <div
            key={index}
            className="border rounded-lg pb-5 p-3 flex flex-col items-center text-center shadow-sm relative"
          >
            {/* Engineer Rate  */}
            <p className="absolute text-gray-600 top-4 right-2 text-sm px-2 py-1 ">
              {engineer.rate}
            </p>

            <br></br>
            {/* Engineer Image */}
            {/* w-24 h-24 */}
            <img
              src={engineer.imgSrc}
              alt={engineer.name}
              className="w-24 h-24 rounded-full"
            />

            {/* Engineer Name */}

            <h2 className="text-l mt-1 ">{engineer.name}</h2>
            {/* Role */}
            <p className="text-gray-500 text-xs">{engineer.role}</p>
            {/* Rating */}
            <p className="text-xs mt-3 text-gray-600 flex items-center">
              <span className="ml-1" aria-hidden="true">
                {/* icon star */}
                <svg
                  class="w-4 h-4 pr-1 text-amber-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </span>
              {engineer.rating} ({engineer.jobs})
            </p>
            {/* Prospect List & icon */}
            <a
              href="#"
              className="text-xs text-gray-700  bg-gray-100 rounded-full px-1 py-1 pr-2 mt-2 flex items-center"
            >
              <span className="ml-1" aria-hidden="true">
                {/* icon */}

                <svg
                  class="w-4 h-4 text-gray-600 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                  <path
                    fill-rule="evenodd"
                    d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                    clip-rule="evenodd"
                  />
                  <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
                </svg>
              </span>
              Prospect List
            </a>
            {/* Skills */}
            <div className="mt-2">
              {engineer.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="flex gap-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full "
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* See More Button */}
            <button className="text-xs mt-4 bg-amber-300 text-white px-3 py-1 rounded-md hover:bg-amber-400">
              <Link to={"/engineer-details"}>See more</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EngineersList;
