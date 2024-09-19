import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [subNavContent, setSubNavContent] = useState("");
  const [isSubNavVisible, setIsSubNavVisible] = useState(false);

  const handleMouseEnterLi = (content) => {
    setSubNavContent(content);
    setIsSubNavVisible(true);
  };

  const handleMouseLeaveLi = () => {
    setTimeout(() => {
      if (!isSubNavVisible) {
        setIsSubNavVisible(false);
      }
    }, 100);
  };

  const handleMouseEnterSubNav = () => {
    setIsSubNavVisible(true);
  };

  const handleMouseLeaveSubNav = () => {
    setIsSubNavVisible(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-white w-full ">
        <nav className="border-amber-300  border-b-2   px-10 py-2.5 datext-black">
          <div className="flex flex-wrap items-center justify-between px-4 mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <Link to={""} className="flex items-center mr-8">
                  <img
                    src={logo}
                    className="h-12 w-12 mr-2"
                    alt="Handas Logo"></img>
                  <span className="font self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Handesly
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex items-center lg:order-2">
              <div className="flex gap-10 justify-center items-center">
                <div className="search-bar rounded-2xl lg:w-80 md:w-52 md:flex justify-center items-center bg-white border hidden border-gray-400">
                  <input
                    className="h-7 p-2 w-3/4 text-sm  rounded-l-2xl border-e focus:outline-none focus:border-gray-500 focus:border focus:ring-0 border-transparent bg-white bg-opacity-50"
                    type="search"
                    placeholder="Search ..."
                  />
                  <div className="search-dropdown w-1/4">
                    <button className="dropbtn w-full rounded-e-2xl py-1 h-full flex justify-center items-center gap-1 bg-white text-black text-sm px-2">
                      for{" "}
                      <i className="text-black fa-solid fa-chevron-down"></i>
                    </button>
                    <div className="dropdown-content">
                      <a href="#">
                        <i className="fa-solid fa-user-check"></i> Talent
                      </a>
                      <a href="#">
                        <i className="fa-solid fa-briefcase"></i> Jobs
                      </a>
                    </div>
                  </div>
                </div>

                <NavLink to={"/login"} className="cursor-pointer text-lg">
                  Login
                </NavLink>
                <Link
                  to={"/register"}
                  className="text-whitetext-black hover:bg-amber-400 bg-amber-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-6 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:text-black focus:outline-none dark:focus:ring-purple-800">
                  Sign up
                </Link>
              </div>

              <button
                onClick={toggleMenu}
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hovetext-black dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isOpen}>
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"></path>
                </svg>
                <svg
                  className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
                isOpen ? "block" : "hidden"
              }`}
              id="mobile-menu-2">
              {/* <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Find Talent{" "}
                    <i className="ttext-black fa-solid fa-chevron-down"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Find Work{" "}
                    <i className="text-amber-700 fa-solid fa-chevron-down"></i>
                    <i className="ttext-black fa-solid fa-chevron-down"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Why Handas{" "}
                    <i className="ttext-black fa-solid fa-chevron-down"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Contact
                  </a>
                </li>
              </ul> */}
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0  ">
                <li>
                  <NavLink
                    to={""}
                    className="block py-2 pl-3 pr-4 black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-400 lg:p-0">
                    Home
                  </NavLink>
                </li>
                <li
                  onMouseEnter={() =>
                    handleMouseEnterLi(
                      <>
                        <div className="md:flex gap-2">
                          <div className="options border-r border-gray-400 md:w-1/4">
                            <div className="option rounded-lg hover:bg-yellow-50 mr-4 p-4">
                              <p className=" my-2 font-medium text-sm text-black">
                                <Link to={"/client"}>
                                  Post job and hire Engineer{" "}
                                </Link>
                              </p>
                              <p className="font-medium text-sm text-black">
                                Engineers Catalog
                              </p>
                            </div>
                          </div>
                          <div className="selected-option p-3 md:w-1/3">
                            <p className=" my-2text-black font-bold">
                              At Handas
                            </p>
                            <p className=" my-2 font-medium text-black">
                              you can find the right engineer for your job{" "}
                            </p>
                            <p className=" text-sm leading-7 my-2 font-medium">
                              <span className="text-black font-bold">
                                Specialized Expertise:
                              </span>{" "}
                              With access to a wide range of engineers, you can
                              find individuals with specific expertise that
                              perfectly matches your project requirements.
                            </p>
                            <p className=" text-sm leading-7 my-2 font-medium">
                              <span className="text-black font-bold">
                                Diverse Perspectives:
                              </span>{" "}
                              Engineers from different backgrounds bring unique
                              approaches to problem-solving, leading to more
                              innovative solutions.
                            </p>

                            <p className="text-amber-600 underline text-sm font-bold">
                              <Link to={"/engineers-list"}>
                                Browse all Engineers{" "}
                              </Link>
                              <i class="fa-solid fa-arrow-right"></i>{" "}
                            </p>
                          </div>
                          <div className="eng-types p-3 ms-3">
                            <p className="my-2 font-semibold text-gray-800">
                              1. Civil Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              2. Software Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              3. Industrial Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              4. Mechanical Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              5. Electrical Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              6. Systems Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              7. Petroleum Engineers
                            </p>
                            <p className="my-2 font-semibold text-gray-800">
                              8. Materials Engineers
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  }
                  onMouseLeave={handleMouseLeaveLi}>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-400 lg:p-0">
                    Find Talent{" "}
                    <i className="ttext-black fa-solid fa-chevron-down"></i>
                  </a>
                </li>
                <li
                  onMouseEnter={() =>
                    handleMouseEnterLi(
                      <>
                        <div className="find-work md:flex">
                          <div className="md:w-1/4 border-r border-gray-600">
                            <p className="text-black font-bold">Ways to Earn</p>
                            <p className=" text-black text-sm  md:w-1/2">
                              Learn why Handas is the best for you
                            </p>
                          </div>
                          <div className="md:w-1/3 ms-3 border-r hover:bg-amber-100 border-gray-600">
                            <p className="text-black font-bold">
                              <Link to={"/jobs"}>
                                Find work for your Skills{" "}
                              </Link>
                            </p>
                            <p className=" text-black text-sm  md:w-1/2">
                              Explore the kind of work that will be available in
                              tour field{" "}
                            </p>
                          </div>{" "}
                          <div className="md:w-1/3 ms-3 border-r border-gray-600">
                            <p className="text-black font-bold">
                              Gain work by Ads{" "}
                            </p>
                            <p className=" text-black text-sm  w-1/2">
                              Get Notified with all job is available for you{" "}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  }
                  onMouseLeave={handleMouseLeaveLi}>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0">
                    Find Work{" "}
                    <i className="ttext-black fa-solid fa-chevron-down"></i>
                  </a>
                </li>
                <li
                  onMouseEnter={() =>
                    handleMouseEnterLi(
                      <>
                        <div className="find-work md:flex">
                          <div className="md:w-1/4 border-r border-gray-600">
                            <p className="text-black font-bold">
                              <Link to={"/about"}>Success Stories</Link>
                            </p>
                            <p className=" text-black text-sm  md:w-1/2">
                              Discover how team work stratigicaly and grow
                              together{" "}
                            </p>
                          </div>
                          <div className="md:w-1/4 ms-3 border-r border-gray-600">
                            <p className="text-black font-bold">Reviews </p>
                            <p className=" text-black text-sm  md:w-1/2">
                              Explore all the good and bad reviews for every
                              client or engineer{" "}
                            </p>
                          </div>{" "}
                          <div className="md:w-1/4 ms-3 border-r border-gray-600">
                            <p className="text-black font-bold">How to hire </p>
                            <p className=" text-black text-sm  md:w-1/2">
                              Learn the best ways to find the right hire{" "}
                            </p>
                          </div>
                          <div className="md:w-1/4 ms-3 border-r border-gray-600">
                            <p className="text-black font-bold">
                              How to find work{" "}
                            </p>
                            <p className=" text-black text-sm  md:w-1/2">
                              Learn the best ways to find the available work
                              based in your type{" "}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  }
                  onMouseLeave={handleMouseLeaveLi}>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0">
                    Why Handas{" "}
                    <i className="ttext-black fa-solid fa-chevron-down"></i>
                  </a>
                </li>

                <li>
                  <NavLink
                    to={"/contact"}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className={`sub-nav z-20  bg-white ttext-black border-b-2 border-amber-300 w-full p-10 md:fixed transition-opacity duration-300 ${
            isSubNavVisible ? "opacity-100" : "opacity-0 hidden"
          }`}
          onMouseEnter={handleMouseEnterSubNav}
          onMouseLeave={handleMouseLeaveSubNav}>
          {subNavContent}
        </div>
        <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
      </div>
    </>
  );
}
