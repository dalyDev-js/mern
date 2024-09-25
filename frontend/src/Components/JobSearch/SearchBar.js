import React from "react";

function SearchBar() {
  return (
    <form className="flex gap-2.5 mb-5 w-full">
      <label htmlFor="jobSearch" className="sr-only">
        Search for jobs
      </label>
      <input
        type="text"
        id="jobSearch"
        placeholder="Search for jobs..."
        className="p-2.5 rounded border border-solid border-neutral-300 grow-[2] focus:border-amber-300 focus:ring-amber-300"
      />
      <select className="p-2.5 bg-white rounded border border-solid border-neutral-300 focus:border-amber-300 focus:ring-amber-300">
        <option>Best Matches</option>
        <option>Most Recent</option>
      </select>
      <button className="px-5 py-2.5 text-black bg-amber-300 hover:bg-amber-400 rounded border-white border-[none] font-[bold] ">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
