import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchServiceById } from "../../redux/slices/jobSlice";
import { fetchProposalsByServiceId } from "../../redux/slices/proposalSlice";
import { fetchEngineerByEngineerId } from "../../redux/slices/engineersSlice";
import engPlaceholder from "../../assets/eng.jpg"; // Placeholder image

export default function JobProposals() {
  const { id: serviceId } = useParams(); // Get the job ID from the URL params
  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState({});
  const [proposals, setProposals] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [profilePics, setProfilePics] = useState({}); // Store profile pictures here
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobResponse = await dispatch(fetchServiceById(serviceId));
        const proposalResponse = await dispatch(
          fetchProposalsByServiceId(serviceId)
        );

        setSelectedJob(jobResponse?.payload);
        setProposals(proposalResponse?.payload);

        const userIds = proposalResponse?.payload.map(
          (proposal) => proposal.engineer._id || []
        );
        await fetchUserDetails(userIds);
      } catch (err) {
        console.error("Failed to load job data:", err);
      }
    };

    const fetchUserDetails = async (userIds) => {
      try {
        const userDetails = await Promise.all(
          userIds.map(async (userId) => {
            const userResponse = await dispatch(
              fetchEngineerByEngineerId(userId)
            );
            const { fullName, profilePic } = userResponse?.payload?.user || {};
            return { userId, fullName, profilePic };
          })
        );

        const nameMap = {};
        const picMap = {};

        userDetails.forEach(({ userId, fullName, profilePic }) => {
          nameMap[userId] = fullName;
          picMap[userId] = profilePic || engPlaceholder;
        });

        setUserNames(nameMap);
        setProfilePics(picMap);
        setDataLoaded(true);
      } catch (err) {
        console.error("Failed to load user details:", err);
      }
    };

    fetchJobData();
  }, [dispatch, serviceId]);

  if (!dataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  if (!selectedJob || proposals.length === 0) {
    return <p>No proposals found for this job.</p>;
  }

  return (
    <>
      <div className="jobs-proposals w-3/5 mx-auto">
        <div className="job-proposals p-7 my-10 bg-slate-100 rounded-lg">
          <div className="job flex">
            <div className="job-data w-3/4">
              <p className="job-name text-2xl font-medium text-amber-700">
                {selectedJob.title}
              </p>
              <p className="job-description w-4/5 text-gray-600 mt-2">
                {selectedJob.description}
              </p>
              <div className="skills flex gap-2 mt-5">
                {selectedJob.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill text-amber-900 w-24 h-8 flex justify-center items-center rounded-md font-medium p-2 bg-slate-300">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="view-proposals w-1/4">
              <button className="view mt-4 px-4 float-end font-semibold p-2 rounded-full text-white bg-red-500 hover:bg-red-600">
                <i className="text-white fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          <p className="text-lg mt-4 font-medium">Job Proposals</p>
          <hr />
          <div className="proposals">
            {proposals.map((proposal, index) => (
              <div
                key={index}
                className="proposal p-4 mt-4 bg-slate-50 hover:bg-white cursor-pointer hover:shadow-lg rounded-lg">
                <div className="eng-name-image-view flex items-center justify-between gap-2">
                  <div className="name-image flex items-center gap-2 mb-4">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={profilePics[proposal.engineer._id] || profilePics}
                      alt="Engineer"
                    />
                    <p className="text-lg font-semibold">
                      {userNames[proposal.engineer._id] || "Loading..."}
                    </p>
                  </div>
                  {/* Pass serviceId through Link state */}
                  <Link
                    to={`/engineer-details/${proposal.engineer._id}`}
                    state={{ serviceId }} // Pass the serviceId through state
                  >
                    <button className="View p-2 bg-amber-400 hover:bg-amber-500 rounded-md font-medium">
                      View Profile
                    </button>
                  </Link>
                </div>
                <hr />
                <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                  {proposal.content}
                </div>
                <div className="eng-proposal p-4 text-base font-medium text-gray-600">
                  Budget: ${proposal.budget}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
