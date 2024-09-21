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
} from "../../redux/slices/engineersSlice"; // Updated import
import { useLoading } from "../../utils/LoadingContext";
import { jwtDecode } from "jwt-decode";
import { ProposalModa } from "../../Components/ProposalModal/ProposalModal";

function JobDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedJob } = useSelector((state) => state.job);
  const { savedJobs = [] } = useSelector((state) => state.engineerlist);

  const { setIsLoading } = useLoading();
  const [showForm, setShowForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [engineerId, setEngineerId] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [submittedProposals, setSubmittedProposals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      console.log("Loading data...");
      try {
        const token = localStorage.getItem("Token");

        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          console.log("Decoded user ID:", userId);

          await Promise.all([
            dispatch(fetchServiceById(id)),
            dispatch(fetchUserById(userId)),
          ]);

          const userResponse = await dispatch(fetchUserById(userId));
          console.log(userResponse, "response");
          const [verifiedStatus] = userResponse?.payload?.verifiedStatus || [];
          setIsVerified(verifiedStatus === "accepted");

          // Fetch engineer by ID to use for submission
          const engineerResponse = await dispatch(fetchEngineerById(userId));
          setEngineerId(engineerResponse.payload._id); // Set the engineer ID

          setSubmittedProposals(
            engineerResponse.payload.submittedProposals || []
          );
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

  const postedTimeAgo = moment(selectedJob?.createdAt).fromNow();

  const handleSubmitProposal = async (proposalData) => {
    console.log("Submitting proposal:", proposalData);
    const response = await dispatch(
      submitProposal({
        engineerId: engineerId, // Use the fetched engineerId here
        service: selectedJob._id,
        content: proposalData.content,
        budget: proposalData.budget,
      })
    );

    if (submitProposal.fulfilled.match(response)) {
      console.log("Proposal submitted successfully:", response.payload);
      setShowForm(false);
      setIsSuccessModalVisible(true);

      // Update local state to reflect the submitted proposal
      setSubmittedProposals((prev) => [...prev, response.payload.service]);
    } else {
      console.log("Failed to submit proposal:", response);
    }
  };

  const handleSaveJob = async () => {
    if (isVerified) {
      console.log("Saving job with ID:", selectedJob._id);
      await dispatch(saveJob({ serviceId: selectedJob._id }));
    }
  };

  const isJobSaved = savedJobs.some((job) => job._id === selectedJob?._id);
  const isProposalSubmitted = submittedProposals.some(
    (proposal) => proposal === selectedJob?._id
  );

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid bg-slate-50 rounded-lg grid-cols-1 sm:grid-cols-3 gap-6 m-16">
      <ProposalModa
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitProposal}
        selectedJob={selectedJob}
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

      <div className="col-span-2 p-8">
        <h1 className="job-title text-2xl text-amber-600 font-bold mb-4">
          {selectedJob?.title}
        </h1>

        <p className="text-gray-600">Posted {postedTimeAgo}</p>
        <span className="flex gap-2 mb-4"></span>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p className="job-description mb-4">{selectedJob?.description}</p>

        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Budget:</span>
          <span className="job-budget text-amber-400">
            {selectedJob?.budget}
          </span>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Experience Level:</span>
          <span>{selectedJob?.level}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Project Type:</span>
          <span>One-time project</span>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="mt-8">
          <h2 className="font-bold text-lg">Skills and Expertise</h2>
          <p className="mt-2">{selectedJob?.skills}</p>
        </div>
      </div>

      <div className="col-span-1 p-4 bg-gray-100 border-l border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-6"></div>

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
            <svg
              className="w-6 h-5 pr-2 text-black group-hover:text-black"
              aria-hidden="true"
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
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
            {isJobSaved ? "Job Saved" : "Save Job"}
          </span>
        </button>

        {!isVerified && (
          <p className="text-red-500">
            You must be verified to apply or save jobs.
          </p>
        )}

        <div className="flex items-center gap-2 mb-6 mt-4"></div>
      </div>
    </div>
  );
}

export default JobDetail;
