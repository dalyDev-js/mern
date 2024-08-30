import React from "react";

function JobCard({ title, description, postedTime, paymentType }) {
  return (
    <article className="flex justify-between items-start p-5 bg-white rounded border border-solid border-neutral-300">
      <div className="grow-[2]">
        <h3 className="mb-2.5 text-lg text-zinc-800">{title}</h3>
        <p className="mb-2.5 text-gray-500">{description}</p>
        <span className="text-neutral-400">{postedTime}</span>
      </div>
      <div className="text-right">
        <p className="mb-2.5 text-zinc-800">{paymentType}</p>
        <p className="mb-2.5 text-zinc-800">Location:</p>
      </div>
    </article>
  );
}
export default JobCard;
