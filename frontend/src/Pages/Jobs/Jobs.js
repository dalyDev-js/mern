import React from "react";
import SearchBar from "../../Components/JobSearch/SearchBar";
import JobList from "../../Components/JobSearch/JobList";
import Sidebar from "../../Components/Sidebar/Sidebar";

function JobSearch() {
  return (
    <div className=" pb-8 items-center  mt-10">
      <div className="jobs-page w-4/5 mx-auto flex gap-2">
        <div className="left-content w-2/3">
          <div className="big-label w-full p-6 rounded-lg shadow-lg bg-amber-600 h-60 mb-4 mt-4  ">
            <p className="text-slate-100 text-2xl">
              Rise to the top of the client's list
            </p>
            <p className="text-white text-3xl w-2/3">
              Boosted Proposals deliver 10x more earnings on ad spend
            </p>
            <button className="mt-7 bg-white rounded-md p-2 px-5">
              Boost Now
            </button>
          </div>

          <SearchBar />
          <p className="text-2xl my-5 font-medium">Jobs you might Like</p>
          <JobList />
        </div>
        <div className="right-content w-1/3">
          {" "}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
