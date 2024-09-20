"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import from react-redux
import { Accordion } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { fetchEngineerById } from "../../redux/slices/engineersSlice";
import { Link } from "react-router-dom";

function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  // Access selected engineer from Redux state
  const selectedEngineer = useSelector(
    (state) => state.engineerlist.selectedEngineer
  );
  console.log(selectedEngineer);

  console.log(selectedEngineer);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Handle dynamic name from token
    const token = localStorage.getItem("Token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setFullName(decodedToken.fullName); // Set full name from token
      setUserId(decodedToken.id);

      // Dispatch fetchEngineerById to populate the selectedEngineer state

      dispatch(fetchEngineerById(userId));
      console.log();
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, userId]);

  return (
    <>
      {expanded && (
        <>
          <div className="w-full p-4 bg-white rounded-lg">
            <div className="p-4 bg-gray-100 rounded-lg mb-6">
              <div className="flex flex-col mb-6">
                <div className="flex justify-start gap-3 mb-1">
                  <img
                    className="w-16 h-16 mb-2 rounded-full shadow-lg"
                    // Use engineer.profilePic if available, else fallback to Link placeholder
                    src={
                      selectedEngineer?.user?.profilePic ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                  />
                  <div className="flex flex-col mb-6">
                    <Link
                      to={`/profile/${userId}`}
                      className="mb-1 text-xl font-medium underline text-gray-900">
                      {fullName}
                    </Link>
                    {/* Display engineer title */}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedEngineer?.title || "Engineer"}
                    </span>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-xs text-amber-400 underline hover:no-underline">
                  Complete your profile
                </Link>
                <div className="text-xs text-right text-amber-400">45%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-400 h-2.5 rounded-full"
                    style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>

            {/* Other Sidebar content */}
            <div className="p-4 bg-gray-100 rounded-lg shadow mb-6">
              <Accordion>
                <Accordion.Panel>
                  <Accordion.Title className="p-3">
                    Promote with ads
                  </Accordion.Title>
                  <Accordion.Content>
                    <span className="flex gap-16 hover:underline">
                      <p className="mb-2 text-gray-1000">Availability badge</p>
                      <Link
                        href="#"
                        className="text-base text-amber-400 underline hover:no-underline">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </Link>
                    </span>
                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000">Boost your profile</p>
                      <Link
                        href="#"
                        className="text-base text-amber-400 underline hover:no-underline">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </Link>
                    </span>
                  </Accordion.Content>
                </Accordion.Panel>

                <hr />
                <Accordion.Panel>
                  <Accordion.Title className="p-3">Connects</Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-1000">Available: 0</p>
                    <span className="flex gap-2">
                      <Link
                        href="#"
                        className="text-xs text-amber-400 underline">
                        View details
                      </Link>
                      <span>|</span>
                      <Link
                        href="#"
                        className="text-xs text-amber-400 underline">
                        Buy Connects
                      </Link>
                    </span>
                  </Accordion.Content>
                </Accordion.Panel>

                <hr />
                <Accordion.Panel>
                  <Accordion.Title className="p-3">Preferences</Accordion.Title>
                  <Accordion.Content>
                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000">Hours per week</p>
                      <Link
                        href="#"
                        className="text-base text-amber-400 underline hover:no-underline">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </Link>
                    </span>
                    <p className="text-xs mb-2">More than 30 hrs/week</p>
                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000">Profile Visibility</p>
                      <Link
                        href="#"
                        className="text-base text-amber-400 underline hover:no-underline">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </Link>
                    </span>
                    <p className="text-xs mb-2">Public</p>

                    <span className="flex gap-16 hover:underline">
                      <p className="text-gray-1000">Job Preference</p>
                      <Link
                        href="#"
                        className="text-base text-amber-400 underline hover:no-underline">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </Link>
                    </span>
                    <p className="text-xs mb-2">No preference set</p>

                    <span className="flex gap-16">
                      <p className="text-gray-1000">My Categories</p>
                      <Link
                        href="#"
                        className="text-base text-amber-400 underline hover:no-underline">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                          />
                        </svg>
                      </Link>
                    </span>
                    <ul className="list-none pl-2">
                      <li>
                        <Link
                          href="#"
                          className="text-xs text-amber-400 underline">
                          Web & Mobile Design
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-xs text-amber-400 underline">
                          Web Development
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Panel>

                <hr />
                <Accordion.Panel>
                  <Accordion.Title className="p-3">Proposals</Accordion.Title>
                  <Accordion.Content>
                    <Link href="#" className="text-xs text-amber-400 underline">
                      My Proposals
                    </Link>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Looking for work? Browse jobs and get started on Link
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
                    <Link href="#" className="text-xs text-amber-400 underline">
                      My Project Dashboard
                    </Link>
                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                      <Link
                        href="#"
                        className="text-xs text-amber-400 underline">
                        Create Link Catalog project
                      </Link>{" "}
                      for clients to purchase instantly.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
