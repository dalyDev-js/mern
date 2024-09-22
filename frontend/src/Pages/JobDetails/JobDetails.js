import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServiceById } from "../../redux/slices/jobSlice";
import moment from "moment";
import { fetchUserById } from "../../redux/slices/userSlice";
import {
  fetchEngineerById,
  saveJob,
  submitProposal,
} from "../../redux/slices/engineersSlice";
import { useLoading } from "../../utils/LoadingContext";
import { jwtDecode } from "jwt-decode"; // Fix this import
import { ProposalModa } from "../../Components/ProposalModal/ProposalModal";

function JobDetail() {
  const { id } = useParams(); // job id from URL params
  const dispatch = useDispatch();

  const { savedJobs = [] } = useSelector((state) => state.engineerlist);
  const { setIsLoading } = useLoading();

  const [showForm, setShowForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [engineerId, setEngineerId] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [submittedProposals, setSubmittedProposals] = useState([]);
  const [isProposalSubmitted, setIsProposalSubmitted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("Token");

        if (token) {
          const decodedToken = jwtDecode(token); // Decode token to get userId
          const userId = decodedToken.id;

          // Fetch the job by id from params, and the user (engineer)
          const [serviceResponse, userResponse] = await Promise.all([
            dispatch(fetchServiceById(id)), // Fetch the job using params
            dispatch(fetchUserById(userId)), // Fetch user info
          ]);

          const job = serviceResponse.payload; // Fetched job from service response
          const engineerResponse = await dispatch(fetchEngineerById(userId)); // Fetch engineer using userId

          const engineer = engineerResponse.payload;
          setEngineerId(engineer._id); // Store engineer's ID for later

          // Check if engineer is verified
          const [verifiedStatus] = userResponse?.payload?.verifiedStatus || [];
          setIsVerified(verifiedStatus === "accepted");

          // Set the engineer's submitted proposals
          const proposals = engineer?.submittedProposals || [];
          setSubmittedProposals(proposals);

          // Check if the current job has already been submitted by this engineer
          const alreadySubmitted = proposals.includes(id); // Check against job id in params
          setIsProposalSubmitted(alreadySubmitted);

          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch, id, setIsLoading]);

  const handleSubmitProposal = async (proposalData) => {
    console.log("Submitting proposal:", proposalData);

    const response = await dispatch(
      submitProposal({
        engineerId: engineerId, // Use the engineer's ID here
        service: id, // Use the job id from URL params
        content: proposalData.content,
        budget: proposalData.budget,
      })
    );

    if (submitProposal.fulfilled.match(response)) {
      console.log("Proposal submitted successfully:", response.payload);
      setShowForm(false);
      setIsSuccessModalVisible(true);

      // Update local state to reflect the submitted proposal
      setSubmittedProposals((prev) => [...prev, id]);
    } else {
      console.log("Failed to submit proposal:", response);
    }
  };

  const handleSaveJob = async () => {
    if (isVerified) {
      console.log("Saving job with ID:", id);
      await dispatch(saveJob({ serviceId: id }));
    }
  };

  const isJobSaved = savedJobs.some((job) => job._id === id);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid bg-slate-50 rounded-lg grid-cols-1 sm:grid-cols-3 gap-6 m-16">
      <ProposalModa
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitProposal}
        selectedJob={id} // Pass the job ID directly
        engineerId={engineerId}
      />

      {isSuccessModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-35">
          <div
            className="bg-white p-6 w-1/3 rounded-lg shadow-md text-center transition-all duration-300 ease-out transform scale-100 opacity-100"
            style={{
              animation: "fadeInScale 0.3s ease-out",
            }}>
            <div className="flex justify-center mb-4">
              <i className="text-4xl text-green-500 fa-solid fa-check-circle"></i>
            </div>
            <p className="text-2xl font-semibold mb-2">Success</p>
            <p className="text-gray-600 mb-4">
              Proposal submitted successfully.
            </p>
            <button
              onClick={() => setIsSuccessModalVisible(false)}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600">
              OK
            </button>
          </div>
        </div>
      )}

      {/* Display the job details */}
      <div className="col-span-2 p-8">
        <h1 className="job-title text-2xl text-amber-600 font-bold mb-4">
          {/* Use job title fetched from the server */}
          Job Title Here {/* Update this with actual job title from response */}
        </h1>

        <p className="text-gray-600">
          {/* Replace this with actual posting time */}
          Posted {moment().fromNow()}
        </p>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p className="job-description mb-4">
          {/* Replace with job description */}
          Job Description Here
        </p>

        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Budget:</span>
          <span className="job-budget text-amber-400">
            {/* Replace with actual budget */}
            1000 USD
          </span>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="mt-8">
          <h2 className="font-bold text-lg">Skills and Expertise</h2>
          <p className="mt-2">{/* Replace with skills */} Skillset Here</p>
        </div>
      </div>

      <div className="col-span-1 p-4 bg-gray-100 border-l border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <button
          onClick={
            isVerified && !isProposalSubmitted ? () => setShowForm(true) : null
          }
          className={`${
            isVerified && !isProposalSubmitted
              ? "bg-amber-300 hover:bg-amber-400 text-black"
              : "bg-gray-400 cursor-not-allowed"
          } text-black px-4 py-2 rounded w-full mb-4`}
          disabled={!isVerified || isProposalSubmitted}>
          {isProposalSubmitted ? "Proposal Submitted" : "Send Proposal"}
        </button>

        <button
          onClick={handleSaveJob}
          className={`relative w-full inline-flex outline-none border-none items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group ${
            isVerified
              ? "bg-white hover:bg-amber-400 hover:text-black text-black"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isVerified || isJobSaved}>
          <span className="relative w-full flex items-center justify-center px-5 py-2.5 transition-all ease-in duration-75 rounded-md">
            {isJobSaved ? "Job Saved" : "Save Job"}
          </span>
        </button>

        {!isVerified && (
          <p className="text-red-500">
            You must be verified to apply or save jobs.
          </p>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
