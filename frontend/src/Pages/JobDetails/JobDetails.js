import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServiceById } from "../../redux/slices/jobSlice";
import moment from "moment";
import { fetchUserById } from "../../redux/slices/userSlice";
import {
  fetchEngineerById,
  removeSavedJob,
  saveJob,
  submitProposal,
} from "../../redux/slices/engineersSlice";
import { useLoading } from "../../utils/LoadingContext";
import { jwtDecode } from "jwt-decode"; // Fixed the import
import { ProposalModa } from "../../Components/ProposalModal/ProposalModal";

function JobDetail() {
  const { id } = useParams(); // job id from URL params
  const dispatch = useDispatch();

  // const { savedJobs = [] } = useSelector((state) => state.engineerlist);
  const { setIsLoading } = useLoading();

  const [showForm, setShowForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [engineerId, setEngineerId] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [engineerSubmittedProposals, setEngineerSubmittedProposals] = useState(
    []
  );
  const [isProposalSubmitted, setIsProposalSubmitted] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);

  const [isJobSaved, setIsJobSaved] = useState(false); // Local state for saved job
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("Token");

        if (token) {
          const decodedToken = jwtDecode(token); // Decode token to get userId
          const userId = decodedToken.id;

          // Fetch the job by id from params, and the user (engineer)
          const [serviceResponse, userResponse, engineerResponse] =
            await Promise.all([
              dispatch(fetchServiceById(id)),
              dispatch(fetchUserById(userId)),
              dispatch(fetchEngineerById(userId)),
            ]);

          setSelectedJob(serviceResponse.payload);
          setSavedJobs(engineerResponse?.payload?.savedJobs);
          console.log(
            "Saved Jobs from backend:",
            engineerResponse.payload.savedJobs
          );
          const engineer = engineerResponse?.payload;
          setEngineerId(engineer._id); // Store engineer's ID for later
          console.log(userResponse.payload._id);
          const [verifiedStatus] = userResponse?.payload?.verifiedStatus || [];
          setIsVerified(verifiedStatus === "accepted");
          console.log(savedJobs);
          // Set the engineer's submitted proposals
          const proposals = engineer?.submittedProposals || [];
          setEngineerSubmittedProposals(proposals);

          const isAlreadySubmitted = proposals.some(
            (proposal) => proposal.service === serviceResponse.payload._id
          );
          setIsProposalSubmitted(isAlreadySubmitted);

          const isJobAlreadySaved = engineerResponse.payload.savedJobs.some(
            (job) => job.service === serviceResponse.payload._id
          );
          setIsJobSaved(isJobAlreadySaved);

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
    if (!selectedJob._id) {
      console.error("Selected job ID is not available.");
      return;
    }

    console.log("Submitting proposal:", proposalData);

    const response = await dispatch(
      submitProposal({
        engineerId: engineerId,
        service: selectedJob._id, // Use the job ID after ensuring it's loaded
        content: proposalData.content,
        budget: proposalData.budget,
      })
    );

    if (submitProposal.fulfilled.match(response)) {
      console.log("Proposal submitted successfully:", response.payload);
      setShowForm(false);
      setIsSuccessModalVisible(true);
      setIsProposalSubmitted(true);
      // Update local state to reflect the submitted proposal
      setEngineerSubmittedProposals((prev) => [...prev, selectedJob._id]);
    } else {
      console.log("Failed to submit proposal:", response);
    }
  };

  const handleToggleSaveJob = async () => {
    if (isVerified) {
      setIsSaving(true); // Disable the button while saving/removing the job
      try {
        if (isJobSaved) {
          // If the job is already saved, remove it from saved jobs
          const response = await dispatch(
            removeSavedJob({
              serviceId: selectedJob._id, // Pass the serviceId (job ID)
              engineerId: engineerId, // Pass the engineerId from the component state
            })
          );
          console.log("Job removed from saved jobs:", response);
          setIsJobSaved(false); // Update the local state to reflect the removal
        } else {
          // If the job is not saved, save it
          const response = await dispatch(
            saveJob({
              serviceId: selectedJob._id, // Pass the serviceId (job ID)
              engineerId: engineerId, // Pass the engineerId from the component state
            })
          );
          console.log("Job saved:", response);
          setIsJobSaved(true); // Update the local state to reflect the save
        }
      } catch (error) {
        console.error("Error saving or removing job:", error);
      } finally {
        setIsSaving(false); // Re-enable the button after the request is complete
      }
    } else {
      console.log("User is not verified, cannot save or remove job.");
    }
  };

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
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
        <p className="text-gray-600">
          {/* Display the relative time from selectedJob.createdAt */}
          Posted {moment(selectedJob?.createdAt).fromNow()}
        </p>
        <h1 className="job-title text-3xl text-amber-300  font-bold mb-4">
          {/* Use job title fetched from the server */}
          {selectedJob?.title}
        </h1>
        <hr />
        <h2 className="font-bold text-lg mt-4">Description:</h2>

        <p className="job-description text-gray-700 mb-4">
          {/* Display the job description */}
          {selectedJob?.description}
        </p>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Budget:</span>
          <span className="job-budget text-amber-400">
            {/* Replace with actual budget */}
            {selectedJob?.budget} USD
          </span>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="mt-8">
          <h2 className="font-bold text-lg">Skills and Expertise</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedJob?.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-amber-300 text-black rounded-full px-4 py-1 text-sm font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex items-center mb-4">
          <span className="font-bold mr-2">Proposals Submitted:</span>
          <span className="job-proposals text-amber-400 font-bold text-lg">
            {/* Replace with actual number of proposals */}
            {selectedJob?.proposals?.length || 0}
          </span>
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
          onClick={handleToggleSaveJob} // Handle both saving and removing
          className={`relative w-full inline-flex outline-none border-none items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group ${
            isVerified
              ? isJobSaved
                ? "bg-white   hover:text-black text-black" // Show as "Save Job" when the job is not saved
                : "bg-amber-300 text-black hover:bg-amber-400" // Show as "Saved" when the job is already saved
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isVerified}>
          <span className="relative w-full flex items-center justify-center px-5 py-2.5 transition-all ease-in duration-75 rounded-md">
            {isJobSaved ? "Saved" : "Save Job"}{" "}
            {/* Toggle text based on state */}
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
