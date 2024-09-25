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
    <div className="grid  rounded-lg grid-cols-1 sm:grid-cols-3 gap-6 m-16">
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
            }}
          >
            <div className="flex justify-center mb-4">
              <i className="text-4xl text-green-500 fa-solid fa-check-circle"></i>
            </div>
            <p className="text-2xl font-semibold mb-2">Success</p>
            <p className="text-gray-600 mb-4">
              Proposal submitted successfully.
            </p>
            <button
              onClick={() => setIsSuccessModalVisible(false)}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Display the job details */}

      <div className="col-span-2 p-8">
        <h1 className="job-title text-3xl text-black font-semibold  mb-4">
          {/* Use job title fetched from the server */}
          {selectedJob?.title}
        </h1>
        <span className="flex ml-3 gap-2">
          <svg
            class="w-5 h-5 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-gray-600 text-sm ">
            {/* Display the relative time from selectedJob.createdAt */}
            Posted {moment(selectedJob?.createdAt).fromNow()}
          </p>
        </span>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <h2 className="font-semibold text-base mt-4">Description:</h2>

        <p className="job-description text-gray-700 mb-4">
          {/* Display the job description */}
          {selectedJob?.description}
        </p>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex items-center mb-4">
          <sapan className="flex  ">
            {/* text-gray-800 */}
            <svg
              class="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
              />
            </svg>
            <span className="font-semibold text-base mr-2">Budget:</span>
          </sapan>
          <span className="job-budget text-amber-400">
            {/* Replace with actual budget */}
            {selectedJob?.budget} $
          </span>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="mt-8">
          <span className="flex">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.718 12c0-1.429-1.339-2.681-3.467-3.5.029-.18.077-.37.1-.545.217-2.058-.273-3.543-1.379-4.182-1.235-.714-2.983-.186-4.751 1.239C10.45 3.589 8.7 3.061 7.468 3.773c-1.107.639-1.6 2.124-1.379 4.182.018.175.067.365.095.545-2.127.819-3.466 2.071-3.466 3.5 0 1.429 1.339 2.681 3.466 3.5-.028.18-.077.37-.095.545-.218 2.058.272 3.543 1.379 4.182.376.213.803.322 1.235.316a5.987 5.987 0 0 0 3.514-1.56 5.992 5.992 0 0 0 3.515 1.56 2.44 2.44 0 0 0 1.236-.316c1.106-.639 1.6-2.124 1.379-4.182-.019-.175-.067-.365-.1-.545 2.132-.819 3.471-2.071 3.471-3.5Zm-6.01-7.548a1.5 1.5 0 0 1 .76.187c.733.424 1.055 1.593.884 3.212-.012.106-.043.222-.058.33-.841-.243-1.7-.418-2.57-.523a16.165 16.165 0 0 0-1.747-1.972 4.9 4.9 0 0 1 2.731-1.234Zm-7.917 8.781c.172.34.335.68.529 1.017.194.337.395.656.6.969a14.09 14.09 0 0 1-1.607-.376 14.38 14.38 0 0 1 .478-1.61Zm-.479-4.076a14.085 14.085 0 0 1 1.607-.376c-.205.313-.405.634-.6.969-.195.335-.357.677-.529 1.017-.19-.527-.35-1.064-.478-1.61ZM8.3 12a19.32 19.32 0 0 1 .888-1.75c.33-.568.69-1.118 1.076-1.65.619-.061 1.27-.1 1.954-.1.684 0 1.333.035 1.952.1a19.63 19.63 0 0 1 1.079 1.654c.325.567.621 1.15.887 1.746a18.869 18.869 0 0 1-1.953 3.403 19.218 19.218 0 0 1-3.931 0 20.169 20.169 0 0 1-1.066-1.653A19.324 19.324 0 0 1 8.3 12Zm7.816 2.25c.2-.337.358-.677.53-1.017.191.527.35 1.065.478 1.611a14.48 14.48 0 0 1-1.607.376c.202-.314.404-.635.597-.97h.002Zm.53-3.483c-.172-.34-.335-.68-.53-1.017a20.214 20.214 0 0 0-.6-.97c.542.095 1.078.22 1.606.376a14.111 14.111 0 0 1-.478 1.611h.002ZM12.217 6.34c.4.375.777.773 1.13 1.193-.37-.02-.746-.033-1.129-.033s-.76.013-1.131.033c.353-.42.73-.817 1.13-1.193Zm-4.249-1.7a1.5 1.5 0 0 1 .76-.187 4.9 4.9 0 0 1 2.729 1.233A16.253 16.253 0 0 0 9.71 7.658c-.87.105-1.728.28-2.569.524-.015-.109-.047-.225-.058-.331-.171-1.619.151-2.787.885-3.211ZM3.718 12c0-.9.974-1.83 2.645-2.506.218.857.504 1.695.856 2.506-.352.811-.638 1.65-.856 2.506C4.692 13.83 3.718 12.9 3.718 12Zm4.25 7.361c-.734-.423-1.056-1.593-.885-3.212.011-.106.043-.222.058-.331.84.243 1.697.418 2.564.524a16.37 16.37 0 0 0 1.757 1.982c-1.421 1.109-2.714 1.488-3.494 1.037Zm3.11-2.895c.374.021.753.034 1.14.034.387 0 .765-.013 1.139-.034a14.4 14.4 0 0 1-1.14 1.215 14.248 14.248 0 0 1-1.139-1.215Zm5.39 2.895c-.782.451-2.075.072-3.5-1.038a16.248 16.248 0 0 0 1.757-1.981 16.41 16.41 0 0 0 2.565-.523c.015.108.046.224.058.33.175 1.619-.148 2.789-.88 3.212Zm1.6-4.854A16.563 16.563 0 0 0 17.216 12c.352-.812.638-1.65.856-2.507 1.671.677 2.646 1.607 2.646 2.507 0 .9-.975 1.83-2.646 2.507h-.004Z" />
              <path d="M12.215 13.773a1.792 1.792 0 1 0-1.786-1.8v.006a1.787 1.787 0 0 0 1.786 1.794Z" />
            </svg>
            <h2 className="font-semibold  text-base">Skills and Expertise</h2>
          </span>

          <div className="mt-3 flex flex-wrap gap-2">
            {selectedJob?.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 text-black rounded-full px-4 py-1 text-sm font-medium"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex items-center mb-4">
          <span className="font-semibold text-base mr-2 flex">
            <span>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </span>
            Proposals Submitted:
          </span>
          <span className="job-proposals text-amber-400">
            {/* Replace with actual number of proposals */}
            {selectedJob?.proposals?.length || 0}
          </span>
        </div>
      </div>

      <div className="col-span-1 p-4  border-l border-gray-200 pt-48">
        <button
          onClick={
            isVerified && !isProposalSubmitted ? () => setShowForm(true) : null
          }
          className={`${
            isVerified && !isProposalSubmitted
              ? "bg-amber-300 hover:bg-amber-400 text-black"
              : "bg-gray-400 cursor-not-allowed"
          } text-black px-4 py-2 rounded w-full mb-4`}
          disabled={!isVerified || isProposalSubmitted}
        >
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
          disabled={!isVerified}
        >
          <span className="flex gap-1">
            <svg
              class="w-8 h-8 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>

            <span className="relative w-full flex items-center justify-center  py-2.5 transition-all ease-in duration-75 rounded-md">
              {isJobSaved ? "Saved" : "Save Job"}{" "}
              {/* Toggle text based on state */}
            </span>
          </span>
        </button>

        {!isVerified && (
          <p className="text-red-500 ml-5">
            You must be verified to apply or save jobs.
          </p>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
