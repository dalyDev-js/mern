import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchUserById } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const [subNavContent, setSubNavContent] = useState("");
  const [isSubNavVisible, setIsSubNavVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [verifiedStatus, setVerifiedStatus] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUserInfo = async () => {
      const token = localStorage.getItem("Token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const fullName = decodedToken.fullName.split(" ")[0];
        const role = decodedToken.role;
        const id = decodedToken.id;

        const user = await dispatch(fetchUserById(id));
        setUserName(fullName);
        setUserRole(role);
        setUserId(id);
        setVerifiedStatus(...(user?.payload?.verifiedStatus || "pending"));
      } else {
        setUserName(null);
        setUserRole(null);
        setVerifiedStatus(null);
      }
    };

    updateUserInfo();

    const intervalId = setInterval(() => {
      updateUserInfo();
    }, 1000);

    window.addEventListener("storage", updateUserInfo);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", updateUserInfo);
    };
  }, [dispatch]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setUserName(null);
    setUserRole(null);
    setVerifiedStatus(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserRole");

    setTimeout(() => {
      dispatch(logout());
      navigate("/signin");
      setIsLoggingOut(false);
    }, 1000);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-white w-full relative">
        <nav className="border-amber-300  border-b-2 px-10 py-2.5 datext-black">
          <div className="flex flex-wrap items-center justify-between px-4 mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <Link to={""} className="flex items-center mr-8">
                  <img
                    src={logo}
                    className="h-12 w-12 mr-2"
                    alt="Handas Logo"
                  />
                  <span className="font self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Handesly
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex items-center lg:order-2">
              <div className="flex gap-10 justify-center items-center">
                {userName ? (
                  <>
                    <div className="flex items-center">
                      <Link to={`/profile/${userId}`} className="mr-2">
                        Hello, {userName}
                      </Link>
                      <div className="relative group">
                        {verifiedStatus === "pending" && (
                          <>
                            <Link to="/verify">
                              <i className="fa-solid fa-exclamation-circle text-yellow-500 cursor-pointer"></i>
                            </Link>
                            <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border-2 border-amber-400 text-sm hidden group-hover:block hover:block max-w-xs w-64 whitespace-normal z-50">
                              <p className="mb-2">
                                {userRole === "client"
                                  ? "Please verify your identity to hire engineers and post jobs."
                                  : "Please verify your identity to find jobs and submit proposals."}
                              </p>
                            </div>
                          </>
                        )}
                        {verifiedStatus === "accepted" && (
                          <img
                            src="/images/verified.png"
                            alt="Verified"
                            className="w-6 h-6"
                          />
                        )}
                        {verifiedStatus === "rejected" && (
                          <>
                            <span
                              role="img"
                              aria-label="error"
                              className="text-red-500">
                              ❌
                            </span>
                            <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border-2 border-red-400 text-sm hidden group-hover:block hover:block max-w-xs w-64 whitespace-normal z-50">
                              <p className="mb-2">
                                Your verification was rejected. Please re-upload
                                your documents for verification.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink to={"/signin"} className="cursor-pointer text-lg">
                      Login
                    </NavLink>
                    <Link
                      to={"/get-started"}
                      className="text-whitetext-black hover:bg-amber-400 bg-amber-300 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-6 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:text-black focus:outline-none dark:focus:ring-purple-800">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none">
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

            {/* Mobile Menu */}
            <div
              className={`fixed top-0 right-0 w-1/2 h-full bg-white z-50 transition-transform duration-700 transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}>
              <button
                className="absolute top-5 right-5 text-gray-500 focus:outline-none"
                onClick={closeMenu}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
              <ul className="flex flex-col mt-4 font-medium">
                <li>
                  <NavLink
                    to={""}
                    onClick={closeMenu}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100">
                    Home
                  </NavLink>
                </li>
                {userRole === "engineer" && (
                  <li>
                    <NavLink
                      to={`/profile/${userId}`}
                      onClick={closeMenu}
                      className="block py-2 pl-3 pr-4 text-black border-b border-gray-100">
                      Profile
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to={"/contact"}
                    onClick={closeMenu}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/about"}
                    onClick={closeMenu}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100">
                    About
                  </NavLink>
                </li>
                {userRole && (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="block w-full py-2 pl-3 pr-4 text-left text-black border-b border-gray-100">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Original Nav Links */}
            <div
              className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}>
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to={""}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-400 lg:p-0">
                    Home
                  </NavLink>
                </li>
                {/* Hide Profile in desktop */}
                {userRole === "client" ? (
                  <li>
                    <NavLink
                      to="/client"
                      className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-400 lg:p-0">
                      Client Dashboard
                    </NavLink>
                  </li>
                ) : userRole === "engineer" ? (
                  <li>
                    <NavLink
                      to="/jobs"
                      className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-300 lg:p-0">
                      Find Work
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <Link
                    to={"/about"}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-300 lg:p-0">
                    Why Handesly
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={"/contact"}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-300 lg:p-0">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/about"}
                    className="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-300 lg:p-0">
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className={`sub-nav z-20 bg-white text-black border-b-2 border-amber-300 w-full p-10 md:fixed transition-opacity duration-300 ${
            isSubNavVisible ? "opacity-100" : "opacity-0 hidden"
          }`}
          onMouseEnter={() => setIsSubNavVisible(true)}
          onMouseLeave={() => setIsSubNavVisible(false)}>
          {subNavContent}
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={closeMenu}></div>
        )}
      </div>
    </>
  );
}
