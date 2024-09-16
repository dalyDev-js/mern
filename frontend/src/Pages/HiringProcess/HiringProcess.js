import React, { useState } from "react";
import { Link } from "react-router-dom";

const HiringProcess = () => {
  const [paymentOption, setPaymentOption] = useState("hourly");

  return (
    <div className="bg-gray-50 p-8 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Send an offer</h1>

        {/* Job Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Hiring team
            </label>
            <select className="block w-full p-2 border focus:ring-amber-400 focus:border-none border-gray-300 rounded">
              <option className="bg-white text-amber-300">
                Abdulrhman Daly
              </option>
              {/* Add more options if needed */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Contract title
            </label>
            <input
              type="text"
              placeholder="Enter the contract title"
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Contract Terms */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contract terms</h2>
          <p className="text-sm mb-4">
            <a href="#" className="text-green-600 underline">
              Upwork Payment Protection
            </a>{" "}
            Only pay for the work you authorize.
          </p>

          {/* Payment Options */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Payment option
            </label>
            <div className="flex space-x-4">
              <div
                className={`flex items-center border-2 p-4 rounded-lg cursor-pointer ${
                  paymentOption === "hourly"
                    ? "border-amber-300"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentOption("hourly")}>
                <input
                  type="radio"
                  name="paymentOption"
                  checked={paymentOption === "hourly"}
                  onChange={() => setPaymentOption("hourly")}
                  className="h-4 w-4 text-amber-300 form-radio mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Pay by the hour</span>
                    <span className="text-xs font-semibold bg-amber-100 text-amber-500 px-2 py-1 rounded">
                      Popular
                    </span>
                  </div>
                  <p className="text-sm">
                    Pay for the number of hours worked on a project
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center border-2 p-4 rounded-lg cursor-pointer ${
                  paymentOption === "fixed"
                    ? "border-amber-300"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentOption("fixed")}>
                <input
                  type="radio"
                  name="paymentOption"
                  checked={paymentOption === "fixed"}
                  onChange={() => setPaymentOption("fixed")}
                  className="h-4 w-4 text-amber-300 form-radio mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Pay a fixed price
                    </span>
                  </div>
                  <p className="text-sm">
                    Pay as project milestones are completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Rendering Based on Payment Option */}
          {paymentOption === "hourly" ? (
            <>
              {/* Pay by the Hour Details */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <span>Pay by the hour</span>
                  <span className="text-gray-600">$20.00 / hr</span>
                </div>
                <p className="text-sm text-gray-600">
                  Abdulrhman A.'s profile rate is $20.00 / hr
                </p>
              </div>

              {/* Schedule a Rate Increase */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Schedule a rate increase
                </label>
                <div className="flex space-x-4 mb-4">
                  <select className="flex-1 p-2 border border-gray-300 rounded">
                    <option>Select a frequency</option>
                    {/* Add more options if needed */}
                  </select>
                  <select className="flex-1 p-2 border border-gray-300 rounded">
                    <option>Select a percent</option>
                    {/* Add more options if needed */}
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">
                    Weekly limit
                  </label>
                  <div className="flex justify-between items-center">
                    <span>40 hrs/week</span>
                    <span className="text-gray-600">$800.00 max/week</span>
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-amber-300  border-gray-300 rounded focus:ring-0  outline-none"
                    />
                    <label className="ml-2 text-sm">
                      Allow talent to log time manually if needed
                    </label>
                  </div>
                </div>

                {/* Start Date */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">
                    Start date (optional)
                  </label>
                  <input
                    type="date"
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Fixed Price Details */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Pay a fixed price for your project
                </label>
                <input
                  type="text"
                  placeholder="$0.00"
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">
                  This is the price you and Abdulrhman A. have agreed upon
                </span>
              </div>

              {/* Escrow Options */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Deposit funds into Escrow
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="escrowOption"
                      className="h-4 w-4 text-amber-300 form-radio mr-2 focus:ring-amber-400"
                    />
                    <label className="text-sm text-gray-600">
                      Deposit $0.00 for the whole project
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="escrowOption"
                      className="h-4 w-4 text-amber-300 form-radio mr-2 focus:ring-amber-400"
                    />
                    <label className="text-sm text-gray-600">
                      Deposit a lesser amount to cover the first milestone
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Expandable Information Panels */}
          <div className="mb-8">
            <details className="mb-4">
              <summary className="cursor-pointer text-sm text-green-600 font-semibold">
                Add automatic weekly payments for the talent (optional)
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                You can set up automatic payments here...
              </p>
            </details>
            <details className="mb-4">
              <summary className="cursor-pointer text-sm text-green-600 font-semibold">
                How do hourly contracts work?
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                Hourly contracts work by...
              </p>
            </details>
            <details className="mb-4">
              <summary className="cursor-pointer text-sm text-green-600 font-semibold">
                What is a Contract Initiation Fee?
              </summary>
              <p className="mt-2 text-sm text-gray-600">
                A Contract Initiation Fee is...
              </p>
            </details>
          </div>
        </div>

        {/* Work Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Describe the work for Abdulrhman A.
          </label>
          <textarea
            placeholder="Describe the work for Abdulrhman A."
            className="block w-full h-32 p-2 border border-gray-300 rounded"></textarea>
        </div>

        {/* Agree to Terms */}
        <div className="mt-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-amber-300 border-gray-300 rounded focus:ring-0"
            />
            <span className="ml-2 text-sm">
              Yes, I understand and agree to the{" "}
              <a href="#" className="text-green-600 underline">
                Upwork Terms of Service
              </a>
              , including the{" "}
              <a href="#" className="text-green-600 underline">
                User Agreement
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-600 underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button className="px-4 py-2 border hover:bg-gray-100 border-gray-300 rounded text-black">
            Cancel
          </button>
          <Link
            to={"/payment"}
            className="px-4 py-2 bg-amber-300 hover:bg-amber-400 text-black rounded">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HiringProcess;
