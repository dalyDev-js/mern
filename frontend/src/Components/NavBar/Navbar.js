import React, { useState } from "react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar w-full">
        <nav className="border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between px-4 mx-auto">
            <a href="#" className="flex items-center">
              <img
                src={logo}
                className="h-12 w-12 mr-3"
                alt="Handas Logo"
              ></img>
              <span className="pacifico-regular self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Handas
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <div className="flex gap-2 justify-center items-center">
                <div className="search-bar rounded-2xl lg:w-80 md:w-52 flex justify-center items-center bg-white border border-gray-400">
                  <input
                    className="h-7 p-2 w-3/4 text-sm rounded-s-2xl border-e border-gray-500 bg-white bg-opacity-50"
                    type="search"
                    placeholder="Search ..."
                  ></input>
                  <div className="search-dropdown w-1/4">
                    <button className="dropbtn w-full rounded-e-2xl py-1 h-full flex justify-center items-center gap-1 bg-white text-amber-900 text-sm px-2">
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
                <a className="cursor-pointer text-lg">Login</a>
                <a
                  href="https://themesberg.com/product/tailwind-css/landing-page"
                  className="text-white bg-amber-700 hover:bg-amber-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-3 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                >
                  Register
                </a>
              </div>

              <button
                onClick={toggleMenu}
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
                isOpen ? "block" : "hidden"
              }`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-amber-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-amber-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Company
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-amber-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Marketplace
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-amber-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-amber-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-amber-900 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-600 lg:p-0"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
      </div>
    </>
  );
}
