import React, { useState } from "react";
import { useParams } from "react-router-dom";

function JobDetail() {
  const params = useParams(); //--> func
  console.log(params.id);
  const [job, setJobs] = useState({});
  //   return (
  //     // <div className="p-6">
  //     //   {/* {job.title} */}
  //     //   <h1 className="text-3xl font-bold mb-4">job.title</h1>
  //     //   {/* {job.description} */}
  //     //   <p className="mb-2">job.description</p>
  //     //   {/* {job.budget} */}
  //     //   <p className="text-gray-500 mb-2">Budget: job.budget</p>
  //     //   {/* {job.level} */}
  //     //   <p className="text-gray-500 mb-4">Level: job.level</p>
  //     //   <button className="bg-blue-500 text-white px-4 py-2 rounded">
  //     //     Apply Now
  //     //   </button>
  //     // </div>

  //     <div className="flex h-screen">
  //       {/* Sidebar */}
  //       <div className="w-1/4 bg-gray-100 p-4 border-l border-gray-300">
  //         <div class="p-4  bg-gray-100  border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
  //           {/* icon */}
  //           <span className="flex gap-2">
  //             <svg
  //               class=" mb-1 w-6 h-6 text-gray-800 dark:text-white"
  //               aria-hidden="true"
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //             >
  //               <path
  //                 fill="currentColor"
  //                 d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
  //               />
  //               <path
  //                 fill="#fff"
  //                 d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
  //               />
  //             </svg>
  //             {/* text */}

  //             <p class="text-gray-500 dark:text-gray-400">
  //               You’ll need Connects to bid. They’re like credits that show
  //               clients you’re serious.
  //               <a
  //                 href="#"
  //                 class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline"
  //               >
  //                 Learn more
  //               </a>
  //             </p>
  //           </span>
  //         </div>
  //         <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4">
  //           Buy Connects to apply
  //         </button>
  //         <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full mb-4">
  //           Save Job
  //         </button>

  //         <a
  //           href="#"
  //           class=" text-base text-blue-600 dark:text-blue-500 hover:text-blue-500 mb-6"
  //         >
  //           Flag as inappropriate
  //         </a>
  //         <div class="p-4  bg-gray-100   shadow dark:bg-gray-800  mb-6">
  //           {/* icon */}
  //           <span className="flex gap-2">
  //             <svg
  //               class=" mb-1 w-6 h-6 text-gray-800 dark:text-white"
  //               aria-hidden="true"
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //             >
  //               <path
  //                 fill="currentColor"
  //                 d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
  //               />
  //               <path
  //                 fill="#fff"
  //                 d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
  //               />
  //             </svg>
  //             {/* text */}

  //             <p class="text-gray-500 dark:text-gray-400">
  //               Required Connects to submit a proposal: 13
  //               <br />
  //               Available Connects: 0
  //             </p>
  //           </span>
  //         </div>
  //         {/*  */}
  //         <div className="mt-6">
  //           <h2 className="font-bold text-lg">About the client</h2>
  //           <p className="mt-2">Payment method verified</p>
  //           <p className="text-gray-600">4.96 ★★★★★</p>
  //         </div>
  //         {/* about clint */}
  //         <div class="p-4  bg-gray-100  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
  //           {/* icon */}
  //           <span className="flex gap-2">
  //             <svg
  //               class=" mb-1 w-3 h-3 text-blue-600 dark:text-white"
  //               aria-hidden="true"
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //             >
  //               <path
  //                 fill="currentColor"
  //                 d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
  //               />
  //               <path
  //                 fill="#fff"
  //                 d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
  //               />
  //             </svg>
  //             {/* text */}

  //             <p class="text-gray-500 dark:text-gray-400">
  //               Payment method verified
  //             </p>
  //           </span>
  //         </div>
  //         <p className="text-gray-600">4.96 ★★★★★</p>
  //       </div>

  //       {/* Main Content */}
  //       <div className="w-3/4 p-8">
  //         <h1 className="text-2xl font-bold mb-4">
  //           Turn figma to vercel one page
  //         </h1>
  //         <p className="text-gray-600">Posted 8 minutes ago</p>
  //         {/*  */}
  //         <span className="flex gap-2">
  //           <svg
  //             class=" mb-1 w-6 h-6 text-gray-800 dark:text-white"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //           >
  //             <path
  //               fill="currentColor"
  //               d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
  //             />
  //             <path
  //               fill="#fff"
  //               d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
  //             />
  //           </svg>
  //           {/* text */}

  //           <p class="text-gray-500 dark:text-gray-400">
  //             Specialized profiles can help you better highlight your expertise
  //             when submitting proposals to jobs like these.
  //             <a
  //               href="#"
  //               class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline"
  //             >
  //               Create a specialized profile.
  //             </a>
  //           </p>
  //         </span>
  //         <p className="mb-4">
  //           i have a figma one page design want to turn it to a vercel single page
  //           thank you.
  //         </p>

  //         <div className="flex items-center mb-4">
  //           <span className="font-bold mr-2">Budget:</span>
  //           <span className="text-green-500">$60.00</span>
  //         </div>
  //         <div className="flex items-center mb-4">
  //           <span className="font-bold mr-2">Experience Level:</span>
  //           <span>Intermediate</span>
  //         </div>
  //         <div className="flex items-center">
  //           <span className="font-bold mr-2">Project Type:</span>
  //           <span>One-time project</span>
  //         </div>
  //         <div className="mt-8">
  //           <h2 className="font-bold text-lg">Skills and Expertise</h2>
  //           <p className="mt-2">JavaScript</p>
  //         </div>
  //       </div>
  //     </div>

  //   );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 m-16">
      {/* Main Content */}
      <div className="col-span-2 p-8">
        <h1 className="text-2xl font-bold mb-4">
          Turn figma to vercel one page
        </h1>
        <p className="text-gray-600">Posted 8 minutes ago</p>
        <span className="flex gap-2 mb-4">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
            />
            <path
              fill="#fff"
              d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">
            Specialized profiles can help you better highlight your expertise
            when submitting proposals to jobs like these.
            <a
              href="#"
              className="text-base text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >
              Create a specialized profile.
            </a>
          </p>
        </span>
        {/* hr */}
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p className="mb-4">
          i have a figma one page design want to turn it to a vercel single page
          thank you.
        </p>
        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Budget:</span>
          <span className="text-blue-600">$60.00</span>
        </div>
        {/* hr */}
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Experience Level:</span>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Project Type:</span>
          <span>One-time project</span>
        </div>
        {/* hr */}
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="mt-8">
          <h2 className="font-bold text-lg">Skills and Expertise</h2>
          <p className="mt-2">JavaScript</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-1 p-4 bg-gray-100 border-l border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6">
          <span className="flex gap-2">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
              />
              <path
                fill="#fff"
                d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              You’ll need Connects to bid. They’re like credits that show
              clients you’re serious.
              <a
                href="#"
                className="text-base text-blue-600 underline dark:text-blue-500 hover:no-underline"
              >
                Learn more
              </a>
            </p>
          </span>
        </div>
        {/* buttons */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4 hover:bg-blue-600">
          Buy Connects to apply
        </button>

        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 ">
          <span class="relative flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {/*  */}
            {/* hover:text-white القلب مش بيبقي ابيض  */}
            {/*  */}
            <svg
              class="w-6 h-5 pr-2 text-gray-800 hover:text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
            Save Job
          </span>
        </button>
        <br></br>
        {/* div flag */}
        <div className="flex items-center gap-2 mb-6 mt-4">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-blue-500 hover:text-blue-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z"
            />
          </svg>

          <a
            href="#"
            className="text-base text-blue-600 dark:text-blue-500 hover:text-blue-500"
          >
            Flag as inappropriate
          </a>
        </div>

        <div class="p-2 dark:bg-gray-800  mb-6">
          {/* <div class="p-4  bg-gray-100   shadow dark:bg-gray-800  mb-6"> */}
          {/* icon */}
          <span className="flex gap-2">
            <svg
              class=" mb-1 w-6 h-6 text-blue-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
              />
              <path
                fill="#fff"
                d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
              />
            </svg>
            {/* text */}

            <p class="text-gray-500 dark:text-gray-400">
              Required Connects to submit a proposal: 13
              <br />
              Available Connects: 0
            </p>
          </span>
        </div>
        {/* about clint */}
        <div className="mt-6">
          <h2 className="font-bold text-lg">About the client</h2>
        </div>

        <div class="p-2  bg-gray-100  border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 mb-6">
          {/* <div class="p-4  bg-gray-100  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6"> */}
          {/* icon */}
          <span className="flex gap-2">
            <svg
              class=" mb-1 w-4 h-4 text-blue-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
              />
              <path
                fill="#fff"
                d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
              />
            </svg>
            {/* text */}

            <p class="text-gray-500 dark:text-gray-400">
              Payment method verified
            </p>
          </span>
          {/* rate */}

          <div className="flex items-center gap-2 mb-6 mt-4">
            <svg
              class="w-5 h-5 text-yellow-300 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>

            <a
              href="#"
              className="text-base text-blue-600 dark:text-blue-500 hover:text-blue-500"
            >
              4.96
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
