import React from "react";
import SearchBar from "./SearchBar";
import JobList from "./JobList";

function JobSearch() {
  return (
    <main className="box-border flex relative flex-col shrink-0">
      <div className="flex flex-wrap justify-between">
        <div className="flex-1 min-w-[300px]">
          <div className="box-border p-5 w-full" />
        </div>
      </div>
      <section className="box-border flex relative flex-col shrink-0 items-center py-5 w-full bg-sky-50">
        <SearchBar />
        <JobList />
      </section>
    </main>
  );
}

export default JobSearch;
