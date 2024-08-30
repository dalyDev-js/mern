"use client";
import React, { useEffect, useState } from "react";

import { Accordion } from "flowbite-react";

function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check initial screen size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {expanded && (
        <>
          <div class=" w-full p-4  bg-white   rounded-lg   dark:bg-gray-800 dark:border-gray-700 ">
            <div class="p-4  bg-gray-100   rounded-lg  dark:bg-gray-800 dark:border-gray-700 mb-6 ">
              <div class="flex flex-col  mb-6 ">
                <div class="flex justify-start gap-3 mb-1">
                  <img
                    className=" w-16 h-16 mb-2 rounded-full shadow-lg"
                    src="https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
                    alt="imaage"
                  />
                  <div class="flex flex-col  mb-6 ">
                    <a
                      href="#"
                      class="mb-1 text-xl font-medium underline text-gray-900 dark:text-white">
                      Bonnie Green
                    </a>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Visual Designer
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-xs text-blue-600 underline dark:text-blue-500 hover:no-underline">
                  Complete your profile
                </a>
                <div className="text-xs text-right text-blue-700  dark:text-white">
                  45%
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    class="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
            {/* dropdown  dark:border-gray-700*/}
            <div class="p-4  bg-gray-100  rounded-lg shadow dark:bg-gray-800  mb-6">
              <Accordion>
                <Accordion.Panel>
                  <Accordion.Title className="p-3">
                    Promote with ads
                  </Accordion.Title>
                  <Accordion.Content>
                    <span className="flex gap-16 hover:underline">
                      <p className="mb-2  text-gray-1000 dark:text-gray-500">
                        Availability badge
                      </p>
                      <a
                        href="#"
                        class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                        <svg
                          class="w-4 h-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </a>
                    </span>
                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000  dark:text-gray-500">
                        Boost your profile
                      </p>
                      <a
                        href="#"
                        class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                        <svg
                          class="w-4 h-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </a>
                    </span>
                  </Accordion.Content>
                </Accordion.Panel>

                <hr />
                <Accordion.Panel>
                  <Accordion.Title className="p-3">Connects</Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-1000 dark:text-gray-500">
                      Available: 0
                    </p>
                    <span className="flex gap-2 ">
                      <a
                        href="https://flowbite.com/figma/"
                        className="text-xs text-blue-600 underline dark:text-blue-500">
                        View details
                      </a>
                      <span>|</span>
                      <a
                        href="https://flowbite.com/figma/"
                        className="text-xs text-blue-600 underline dark:text-blue-500">
                        Buy Connects
                      </a>
                    </span>
                  </Accordion.Content>
                </Accordion.Panel>
                <hr />
                <Accordion.Panel>
                  <Accordion.Title className="p-3">Preferences</Accordion.Title>
                  <Accordion.Content>
                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000 dark:text-gray-500">
                        Hours per week
                      </p>
                      <a
                        href="#"
                        class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                        <svg
                          class="w-4 h-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </a>
                    </span>
                    <p className="text-xs mb-2 ">More than 30 hrs/week</p>
                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000 dark:text-gray-500">
                        Profile Visibility
                      </p>
                      <a
                        href="#"
                        class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                        <svg
                          class="w-4 h-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </a>
                    </span>
                    <p className="text-xs mb-2">Public</p>

                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000 dark:text-gray-500">
                        Job Preference
                      </p>
                      <a
                        href="#"
                        class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                        <svg
                          class="w-4 h-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </a>
                    </span>
                    <p className="text-xs mb-2">No preference set</p>

                    <span className="flex gap-16 ">
                      <p className="text-gray-1000 dark:text-gray-500">
                        My Categories
                      </p>
                      <a
                        href="#"
                        class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                        <svg
                          class="w-4 h-4 text-blue-600 underline dark:text-blue-500 hover:no-underline"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </a>
                    </span>
                    <ul className="list-none pl-2">
                      <li>
                        <a
                          href="#"
                          className="text-xs text-blue-600 underline dark:text-blue-500">
                          Web & Mobile Design
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          rel="nofollow"
                          className="text-xs text-blue-600 underline dark:text-blue-500">
                          Web Development
                        </a>
                      </li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Panel>

                <hr />
                <Accordion.Panel>
                  <Accordion.Title className="p-3">Proposals</Accordion.Title>
                  <Accordion.Content>
                    <a
                      href="https://flowbite.com/figma/"
                      className="text-xs text-blue-600 underline dark:text-blue-500">
                      My Proposals
                    </a>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Looking for work? Browse jobs and get started on a
                      proposal.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
                <hr />

                <Accordion.Panel>
                  <Accordion.Title className="p-3">
                    Project Catalog
                  </Accordion.Title>
                  <Accordion.Content>
                    <a
                      href="https://flowbite.com/figma/"
                      className="text-xs text-blue-600 underline dark:text-blue-500">
                      My Project Dashboard
                    </a>
                    <p className="mb-2 text-xs  text-gray-500 dark:text-gray-400">
                      <a
                        href="https://flowbite.com/figma/"
                        className="text-xs  text-blue-600 underline dark:text-blue-500">
                        Create a Catalog project
                      </a>
                      for clients to purchase instantly
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
            {/* certificat */}
            <div class="p-4  bg-gray-100  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
              {/* icon */}
              <span className="flex gap-2">
                <svg
                  class=" mb-1 w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
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
                  Stand out with an Upwork Certification!
                  <a
                    href="#"
                    class=" text-base text-blue-600 underline dark:text-blue-500 hover:no-underline">
                    Get Started
                  </a>
                </p>
              </span>
            </div>

            {/* Links */}
            <div class="p-4  bg-gray-100 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6 ">
              <a
                href="#"
                className="text-sm text-blue-600 underline flex items-center">
                Upwork Academy
                <span className="ml-1" aria-hidden="true">
                  {/* icon */}
                  <svg
                    class="w-4 h-4 text-blue-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 underline flex items-center">
                Direct Contracts
                <span className="ml-1" aria-hidden="true">
                  {/* icon */}
                  <svg
                    class="w-4 h-4 text-blue-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 underline flex items-center">
                Get Paid
                <span className="ml-1" aria-hidden="true">
                  {/* icon */}
                  <svg
                    class="w-4 h-4 text-blue-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 underline flex items-center">
                Community & Forums
                <span className="ml-1" aria-hidden="true">
                  {/* icon */}
                  <svg
                    class="w-4 h-4 text-blue-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#"
                className="text-sm text-blue-600 underline flex items-center">
                Help Center
                <span className="ml-1" aria-hidden="true">
                  {/* icon */}
                  <svg
                    class="w-4 h-4 text-blue-600 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
