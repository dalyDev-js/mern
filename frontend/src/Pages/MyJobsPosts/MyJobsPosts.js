import React from "react";
import { Link } from "react-router-dom";

export default function MyJobsPosts() {
  return (
    <>
      <div className="my-jobs-posts px-14 p-8 ">
        <div className="posts w-3/5      ">
          <p className="text-3xl font-semibold">My Recent Posts</p>
          <div className="job w-full flex mt-5 p-7 bg-slate-100 hover:bg-slate-200 cursor-pointer  rounded-lg">
            <div className="job-data w-3/4">
              <p className="job-name text-2xl font-medium text-amber-700">
                Two landing page using (HTMl - CSS - JavaScript )
              </p>
              <p className="job-description w-4/5 text-gray-600 mt-2">
                i need to make two pages to display some products to big online
                store all what i need is two pages coded with HTMl - CSS -
                Tailwind - ReactJS the backend APIs is ready...
              </p>
              <div className="skills flex gap-2  mt-5">
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  JavaScript
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  Tailwind
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  ReactJs
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  CSS
                </div>
              </div>
            </div>
            <div className="view-proposals w-1/4  ">
              <Link to={"/job-proposals"}>
                <button className="view w-full font-semibold p-2 rounded-md text-white bg-amber-500  hover:bg-amber-600 ">
                  <i class="text-amber-100 fa-solid fa-eye"></i> 12 Proposals
                </button>
              </Link>
              <button className="view mt-4 w-full font-semibold p-2 rounded-md text-white bg-red-500  hover:bg-red-600 ">
                <i class="text-amber-100 fa-solid fa-trash"></i> Delete Post
              </button>
            </div>
          </div>
          <div className="job w-full flex mt-5 p-7 bg-slate-100 hover:bg-slate-200 cursor-pointer  rounded-lg">
            <div className="job-data w-3/4">
              <p className="job-name text-2xl font-medium text-amber-700">
                E-commerce Dashboard UI Design
              </p>
              <p className="job-description w-4/5 text-gray-600 mt-2">
                I need a front-end interface for an admin dashboard to manage an
                e-commerce platform. The design should include user and product
                management pages, with filters and data tables. The project must
                be built using HTML, CSS, Tailwind, and ReactJS. Backend APIs
                are already prepared for integration.
              </p>
              <div className="skills flex gap-2  mt-5">
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  JavaScript
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  Tailwind
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  ReactJs
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  CSS
                </div>
              </div>
            </div>
            <div className="view-proposals w-1/4  ">
              <Link to={"/job-proposals"}>
                <button className="view w-full font-semibold p-2 rounded-md text-white bg-amber-500  hover:bg-amber-600 ">
                  <i class="text-amber-100 fa-solid fa-eye"></i> 8 Proposals
                </button>
              </Link>
              <button className="view mt-4 w-full font-semibold p-2 rounded-md text-white bg-red-500  hover:bg-red-600 ">
                <i class="text-amber-100 fa-solid fa-trash"></i> Delete Post
              </button>
            </div>
          </div>
          <div className="job w-full flex mt-5 p-7 bg-slate-100 hover:bg-slate-200 cursor-pointer  rounded-lg">
            <div className="job-data w-3/4">
              <p className="job-name text-2xl font-medium text-amber-700">
                Portfolio Website Development
              </p>
              <p className="job-description w-4/5 text-gray-600 mt-2">
                Build a modern portfolio website to showcase a designer's work.
                It should include a homepage, about section, and a portfolio
                gallery with image lightboxes. The design should be sleek and
                minimalist using HTML, CSS, Tailwind, and ReactJS.
              </p>
              <div className="skills flex gap-2  mt-5">
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  JavaScript
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  Tailwind
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  ReactJs
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  CSS
                </div>
              </div>
            </div>
            <div className="view-proposals w-1/4  ">
              <Link to={"/job-proposals"}>
                <button className="view w-full font-semibold p-2 rounded-md text-white bg-amber-500  hover:bg-amber-600 ">
                  <i class="text-amber-100 fa-solid fa-eye"></i> 43 Proposals
                </button>
              </Link>
              <button className="view mt-4 w-full font-semibold p-2 rounded-md text-white bg-red-500  hover:bg-red-600 ">
                <i class="text-amber-100 fa-solid fa-trash"></i> Delete Post
              </button>
            </div>
          </div>
          <div className="job w-full flex mt-5 p-7 bg-slate-100 hover:bg-slate-200 cursor-pointer  rounded-lg">
            <div className="job-data w-3/4">
              <p className="job-name text-2xl font-medium text-amber-700">
                Event Registration Page
              </p>
              <p className="job-description w-4/5 text-gray-600 mt-2">
                I need a single-page event registration form with validation and
                error handling. The design should be responsive and
                mobile-friendly, using ReactJS and Tailwind CSS for styling. The
                backend for submission is ready.
              </p>
              <div className="skills flex gap-2  mt-5">
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  JavaScript
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  Tailwind
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  ReactJs
                </div>
                <div className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300 ">
                  CSS
                </div>
              </div>
            </div>
            <div className="view-proposals w-1/4  ">
              <Link to={"/job-proposals"}>
                <button className="view w-full font-semibold p-2 rounded-md text-white bg-amber-500  hover:bg-amber-600 ">
                  <i class="text-amber-100 fa-solid fa-eye"></i> 36 Proposals
                </button>
              </Link>
              <button className="view mt-4 w-full font-semibold p-2 rounded-md text-white bg-red-500  hover:bg-red-600 ">
                <i class="text-amber-100 fa-solid fa-trash"></i> Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
