import React from "react";
import SearchBar from "../../Components/JobSearch/SearchBar";
import JobList from "../../Components/JobSearch/JobList";
import Sidebar from "../../Components/Sidebar/Sidebar";

function JobSearch() {
  return (
    <div className="flex justify-between items-center w-[100%] min-h-[100%] mt-10">
      <main className="box-border flex relative flex-col shrink-0 w-[70%] h-screen">
        <div className="flex flex-wrap justify-between">
          <div className="flex-1 min-w-[300px]">
            <div className="box-border p-5 w-full" />
          </div>
        </div>
        <section className="box-border flex relative flex-col shrink-0 items-center py-5 w-full bg-gray-100 rounded-lg">
          <SearchBar />
          <JobList />
        </section>
      </main>
      <Sidebar />
    </div>
  );
}

export default JobSearch;
