import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEngineerByEngineerId } from "../../redux/slices/engineersSlice";
import { createContract } from "../../redux/slices/contractSlice";
import { jwtDecode } from "jwt-decode";

const HiringProcess = () => {
  const [paymentOption, setPaymentOption] = useState("weekly");
  const [engineerFullName, setEngineerFullName] = useState("Loading...");
  const [contractTitle, setContractTitle] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [startDate, setStartDate] = useState(""); // Start Date input state
  const [endDate, setendDate] = useState(""); // end Date input state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setendDateError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [loading, setLoading] = useState(true);
  // const [serviceId, setServiceId] = useState("");

  const { service: serviceId, id: engineerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const fetchEngineerData = async () => {
      const token = localStorage.getItem("Token");
      const clientId = jwtDecode(token).id;
      console.log(clientId);
      setLoading(true);
      try {
        const engineerResponse = await dispatch(
          fetchEngineerByEngineerId(engineerId)
        ).unwrap();
        setEngineerFullName(
          engineerResponse?.user?.fullName || "Unknown Engineer"
        );
        console.log(serviceId);
        setClientId(clientId);
      } catch (err) {
        console.error("Failed to load engineer data:", err);
        setEngineerFullName("Error loading name");
      } finally {
        setLoading(false);
      }
    };

    if (engineerId) {
      fetchEngineerData();
    }
  }, [dispatch, engineerId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Validate contract title
    if (!contractTitle) {
      setTitleError("Contract title is required.");
      hasError = true;
    } else {
      setTitleError("");
    }

    // Validate contract description
    if (!contractDescription) {
      setDescriptionError("Contract description is required.");
      hasError = true;
    } else {
      setDescriptionError("");
    }

    // Validate payment amount
    if (!paymentAmount) {
      setPaymentError("Payment amount is required.");
      hasError = true;
    } else if (isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      setPaymentError("Payment amount must be a positive number.");
      hasError = true;
    } else {
      setPaymentError("");
    }

    // Validate start date
    if (!startDate) {
      setStartDateError("Start date is required.");
      hasError = true;
    } else {
      setStartDateError("");
    }

    // Validate end date
    if (!endDate) {
      setendDateError("end date is required.");
      hasError = true;
    } else {
      setendDateError("");
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      setTermsError("You must agree to the terms before proceeding.");
      hasError = true;
    } else {
      setTermsError("");
    }

    // If there are validation errors, return early
    if (hasError) {
      return;
    }

    const contractData = {
      title: contractTitle,
      description: contractDescription,
      paymentAmount,
      service: serviceId,
      paymentOption,
      startDate,
      endDate,
      engineer: engineerId,
      client: clientId,
      status: "pending",
    };

    // Log the contract data to the console
    console.log("Submitting contract data:", contractData);

    try {
      // Dispatch create contract action
      await dispatch(createContract(contractData)).unwrap();
      alert("Contract created successfully!");
      navigate("/contracts");
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Send an offer</h1>

        <form onSubmit={handleFormSubmit}>
          {/* Job Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Hiring Engineer
              </label>
              <select
                className="block w-full p-2 border focus:ring-amber-400 focus:border-none border-gray-300 rounded"
                value={engineerFullName}
                disabled>
                <option className="bg-white text-amber-300">
                  {engineerFullName}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Contract Title
              </label>
              <input
                type="text"
                placeholder="Enter the contract title"
                className="block w-full p-2 border border-gray-300 rounded"
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
              />
              {titleError && (
                <p className="text-red-500 text-sm">{titleError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 mt-4">
                Contract Description
              </label>
              <textarea
                placeholder="Describe the work"
                className="block w-full h-32 p-2 border border-gray-300 rounded"
                value={contractDescription}
                onChange={(e) =>
                  setContractDescription(e.target.value)
                }></textarea>
              {descriptionError && (
                <p className="text-red-500 text-sm">{descriptionError}</p>
              )}
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Payment option
            </label>
            <div className="flex space-x-4">
              <div
                className={`flex items-center border-2 p-4 rounded-lg cursor-pointer ${
                  paymentOption === "weekly"
                    ? "border-amber-300"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentOption("weekly")}>
                <input
                  type="radio"
                  name="paymentOption"
                  checked={paymentOption === "weekly"}
                  onChange={() => setPaymentOption("weekly")}
                  className="h-4 w-4 text-amber-300 form-radio mr-4"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">Pay per week</span>
                  <p className="text-sm">Pay for week days worked</p>
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
                  <span className="text-sm font-medium">Pay fixed price</span>
                  <p className="text-sm">
                    Pay as project milestones are completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Amount */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Payment Amount
            </label>
            <input
              type="number"
              placeholder="Enter the amount"
              className="block w-full p-2 border border-gray-300 rounded"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
            {paymentError && (
              <p className="text-red-500 text-sm">{paymentError}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              className="block w-full p-2 border border-gray-300 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {startDateError && (
              <p className="text-red-500 text-sm">{startDateError}</p>
            )}
          </div>

          {/* end Date */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">end Date</label>
            <input
              type="date"
              className="block w-full p-2 border border-gray-300 rounded"
              value={endDate}
              onChange={(e) => setendDate(e.target.value)}
            />
            {endDateError && (
              <p className="text-red-500 text-sm">{endDateError}</p>
            )}
          </div>

          {/* Agree to Terms */}
          <div className="mt-8">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-amber-300 border-gray-300 rounded focus:ring-0"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="ml-2 text-sm">
                Yes, I understand and agree to the{" "}
                <Link href="#" className="text-green-600 underline">
                  Handesly Terms of Service
                </Link>
                , including the{" "}
                <Link href="#" className="text-green-600 underline">
                  User Agreement
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-green-600 underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {termsError && <p className="text-red-500 text-sm">{termsError}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="px-4 py-2 border hover:bg-gray-100 border-gray-300 rounded text-black"
              onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-300 hover:bg-amber-400 text-black rounded">
              Send Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HiringProcess;
