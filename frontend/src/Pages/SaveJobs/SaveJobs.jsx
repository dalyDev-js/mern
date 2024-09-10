import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const SaveJobs = () => {
  const [findWorkOpen, setFindWorkOpen] = useState(false);
  const [deliverWorkOpen, setDeliverWorkOpen] = useState(false);
  const [manageFinancesOpen, setManageFinancesOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-300 mb-2 md:mb-0">EngFreelance</h1>
          <nav className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            {/* Find Work Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setFindWorkOpen(!findWorkOpen)}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-haspopup="true"
              >
                Find work
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {findWorkOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Saved Jobs</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Proposals & Offers</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Services</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Promote with Ads</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Direct Contracts</a>
                  </div>
                </div>
              )}
            </div>

            {/* Jobs Dropdown */}
            <div
              className="relative inline-block text-left"
              onMouseEnter={() => setJobsOpen(true)}
              onMouseLeave={() => setJobsOpen(false)}
            >
              <button className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Jobs
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {jobsOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Apply to jobs posted by clients</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Find freelancers and agencies</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">See projects from other pros</a>
                  </div>
                </div>
              )}
            </div>

            {/* Deliver Work Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDeliverWorkOpen(!deliverWorkOpen)}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-haspopup="true"
              >
                Deliver work
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {deliverWorkOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your active contracts</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Contract history</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Hourly work diary</a>
                  </div>
                </div>
              )}
            </div>

            {/* Manage Finances Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setManageFinancesOpen(!manageFinancesOpen)}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-haspopup="true"
              >
                Manage finances
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {manageFinancesOpen && (
                <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Financial overview</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your reports</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Billings and earnings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Transactions and invoices</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Certificate of earnings</a>
                    <p className="px-4 py-2 text-sm text-gray-500">Payments</p>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Withdraw earnings</a>
                    <p className="px-4 py-2 text-sm text-gray-500">Taxes</p>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Tax forms</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Tax information</a>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search Input */}
          <div className="flex items-center border rounded mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search"
              className="border-none px-4 py-2 focus:outline-none "
            />
            <button className="p-2">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </header>

      {/* Return to Search Section */}
      <div className="bg-gray-100 p-4">
        <a href="#" className="text-yellow-300 ml-10">
          &lt; return to Search
        </a>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <img
            src="https://img.freepik.com/free-vector/characters-couple-texting-concept-illustration_53876-66195.jpg?t=st=1725639891~exp=1725643491~hmac=3b61a72d831fa4ad65212b09ef5d3cc8ee133319c5df9f455cbbe2d3909b6939&w=826"
            alt="Illustration"
            className="mt-4 max-w-full h-auto"
          />
          <p className="mt-2 text-sm md:text-base">
            Keep track of jobs you’re interested in. Select the heart icon on a job post to save it for later.
          </p>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold">About Us</h3>
              <ul>
                <li><a href="#" className="hover:underline">Feedback</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Trust & Safety</h3>
              <ul>
                <li><a href="#" className="hover:underline">Help & Support</a></li>
                <li><a href="#" className="hover:underline">Upwork Foundation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Terms</h3>
              <ul>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Follow Us</h3>
              <div className="flex space-x-2">
                <a href="#" className="hover:underline flex items-center">
                  <FontAwesomeIcon icon={faFacebook} className="mr-1" /> Facebook
                </a>
                <a href="#" className="hover:underline flex items-center">
                  <FontAwesomeIcon icon={faTwitter} className="mr-1" /> Twitter
                </a>
                <a href="#" className="hover:underline flex items-center">
                  <FontAwesomeIcon icon={faLinkedin} className="mr-1" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p>© 2015 - 2024 Upwork Global Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaveJobs;