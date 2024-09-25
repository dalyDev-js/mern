import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch Redux actions
import { fetchMyJobs, postJob } from "../../redux/slices/jobSlice"; // Import the Redux action to post the job
import eng1 from "../../assets/engineer1.png";
import eng2 from "../../assets/engineer2.png";
import eng3 from "../../assets/engineer3.png";
import start from "../../assets/start.png";
import card from "../../assets/card.png";
import card2 from "../../assets/card2.png";
import network from "../../assets/network.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../utils/LoadingContext";
import { jwtDecode } from "jwt-decode";
import { fetchUserById } from "../../redux/slices/userSlice";
import { fetchClientById } from "../../redux/slices/clientSlice";
import { WithContext as ReactTags } from "react-tag-input";
import Autosuggest from "react-autosuggest";
import { engineeringSuggestions } from "../../utils/suggestion";
import "./TagsInput.css";
import { AiOutlineClose } from "react-icons/ai";
export default function Client() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { setIsLoading } = useLoading();
  const [jobs, setJobs] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadClientData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("Token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;

          const [userResponse, jobResponse] = await Promise.all([
            dispatch(fetchUserById(userId)),
            dispatch(fetchMyJobs(userId)),
          ]);
          const [verifiedStatus] = userResponse?.payload?.verifiedStatus || [];

          setIsVerified(verifiedStatus === "accepted");
          setJobs(jobResponse?.payload);

          // Set the client ID in jobData once it's loaded
          setJobData((prevData) => ({
            ...prevData,
            client: userId,
          }));

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load client data:", error);
        setIsLoading(false);
      }
    };

    loadClientData();
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setJobData((prevData) => ({
      ...prevData,
      skills: tags.map((tag) => tag.text), // Map tags to skills array
    }));
  }, [tags]);

  const [jobData, setJobData] = useState({
    title: "",
    budget: "",
    description: "",
    skills: [],
    level: " ",
    client: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    budget: "",
    description: "",
    skills: "",
  });

  const handleAddition = () => {
    const trimmedValue = inputValue.trim(); // Trim white spaces
    if (trimmedValue && !tags.some((t) => t.text === trimmedValue)) {
      setTags([...tags, { id: trimmedValue, text: trimmedValue }]);
      setInputValue(""); // Clear input field
    }
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setJobData({
        ...jobData,
        [name]: value.split(",").map((skill) => skill.trim()),
      });
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {
      title: "",
      budget: "",
      description: "",
      skills: "",
    };

    if (jobData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
      formValid = false;
    }

    if (!jobData.budget || isNaN(jobData.budget)) {
      newErrors.budget = "Budget must be a valid number.";
      formValid = false;
    }

    if (jobData.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters long.";
      formValid = false;
    }

    if (jobData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill.";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Console log the jobData to inspect before submitting
    console.log("Job Data before submitting:", jobData);

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("Token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const clientId = decodedToken.id; // Get client ID from the token

        const response = await dispatch(
          postJob({
            ...jobData,
            client: clientId, // Include client ID in the job data
          })
        ).unwrap();

        setResponseMessage(`Job posted successfully: ${response.message}`);
        setIsSuccessModalVisible(true);
      }
    } catch (error) {
      console.log("Error posting job:", error);
      setResponseMessage(`Error posting job: ${error.message}`);
    }
    setIsFormVisible(false);
  };

  const handlePostJobClick = () => {
    setIsFormVisible(true);
  };

  const handleCancelClick = () => {
    setIsFormVisible(false);
  };

  const navigate = useNavigate();
  const handleSuccessModalOkClick = () => {
    setIsSuccessModalVisible(false);
    navigate("/recent-posts");
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [setIsLoading]);

  return (
    <>
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
            <p className="text-gray-600 mb-4">Job Posted successfully.</p>
            <button
              onClick={handleSuccessModalOkClick}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600">
              OK
            </button>
          </div>
        </div>
      )}

      <div className="job-posting-job pt-16 ">
        <div className="client w-5/6 mx-auto ">
          {isFormVisible && (
            <div className="posting-form fixed inset-0 flex justify-center items-center bg-black bg-opacity-35">
              <div className="form w-3/5 mx-auto h-5/6 p-7 bg-white rounded-lg">
                <form onSubmit={handleSubmit}>
                  <div className="motivation-message bg-slate-100 p-4">
                    <p>
                      Bring your ideas to life! Post your project now and
                      connect with talented Engineers from all countries ready
                      to help you achieve your{" "}
                      <span className="text-amber-300">goals.</span>
                    </p>
                  </div>
                  <div className="job-title-budget flex gap-2 mt-3">
                    <div className="job-title w-2/3">
                      <label className="font-medium">Job Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Autocad Design for new building"
                        className="w-full my-3 rounded-md border  p-2 outline-none border-gray-700  focus:ring-amber-400  focus:border-amber-400 "
                        value={jobData.title}
                        onChange={handleChange}
                        required
                      />
                      {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                      )}
                    </div>
                    <div className="job-budget w-1/3">
                      <label className="font-medium">Job Budget</label>
                      <input
                        type="number"
                        name="budget"
                        className="w-full my-3 rounded-md border  p-2 outline-none border-gray-700  focus:ring-amber-400  focus:border-amber-400  "
                        placeholder="$20/hr"
                        value={jobData.budget}
                        onChange={handleChange}
                        required
                      />
                      {errors.budget && (
                        <p className="text-red-500">{errors.budget}</p>
                      )}
                    </div>
                  </div>
                  <div className="job-description mt-3">
                    <label className="font-medium">Job Description</label>
                    <textarea
                      name="description"
                      placeholder="I need ASAP autocad design for building contains..."
                      rows={3}
                      className="w-full my-3 rounded-md border      p-2 outline-none border-gray-700  focus:ring-amber-400  focus:border-amber-400   "
                      value={jobData.description}
                      onChange={handleChange}
                      required
                    />
                    {errors.description && (
                      <p className="text-red-500">{errors.description}</p>
                    )}
                  </div>
                  <div className="skill-input-container">
                    {/* Input Section */}
                    <div className="w-full flex items-center mb-4 mt-8">
                      {/* This is the input styled like Job Level */}
                      <div className="w-full ">
                        <input
                          placeholder="Add new skill"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="w-full    rounded-md    border  p-2 outline-none border-gray-700  focus:ring-amber-400 focus:border-2 focus:border-amber-400 " // Matching Job Level styling
                        />
                      </div>
                      {/* Add Button */}
                      <button
                        type="button"
                        className="ml-3 bg-amber-300 text-black px-4 py-2 rounded-md" // Button beside the input
                        onClick={handleAddition}>
                        Add
                      </button>
                    </div>
                    {errors.skills && (
                      <p className="text-red-500">{errors.skills}</p>
                    )}
                    {/* Tags Section */}
                    <div className="tags-list">
                      {tags.map((tag, index) => (
                        <span
                          key={tag.id}
                          className="bg-amber-300 text-black p-2 rounded-md mr-2 mb-2 inline-flex items-center">
                          {tag.text}
                          <AiOutlineClose
                            className="ml-2 bg-black text-white rounded-full p-1 cursor-pointer"
                            onClick={() => handleDelete(index)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="job-level mt-4">
                    <label className="font-medium">Job Level</label>
                    <select
                      name="level"
                      className="w-full rounded-md mt-3 border  p-2 outline-none border-gray-700  focus:ring-amber-400  focus:border-amber-400 "
                      value={jobData.level}
                      onChange={handleChange}
                      required>
                      <option value="entry">Entry</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  <div className="proposal-action flex justify-between mt-4">
                    <button
                      className="p-1 px-7 bg-gray-800 hover:bg-gray-600 text-lg text-white rounded-md"
                      onClick={handleCancelClick}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="p-1 px-7 bg-amber-300 hover:bg-amber-400 text-lg text-black rounded-md">
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="hiring-required flex  w-full mb-11 ">
            <div className="steps block   w-2/3 ">
              <p className="text-4xl font-semibold">Your Jobs</p>
              <p className="text-3xl mt-3">
                Complete these steps to stand out and hire fast
              </p>
              <div className="required lg:flex gap-3 mt-5 mb-6">
                <div className="billing shadow-xl lg:w-1/2 p-4 rounded-xl bg-white">
                  <p className="ms-7 text-sm text-gray-500">Required to hire</p>
                  <div className="add-billing flex mt-3">
                    <div className="billing-data flex gap-2 items-center w-3/4">
                      <i className="text-xl text-red-600 fa-solid fa-circle-exclamation"></i>
                      <p className="text-xl font-thin">
                        <span className="font-semibold underline me-1">
                          {" "}
                          <Link to={"/payment"}>Add a Billing Method.</Link>
                        </span>
                        you could start hiring 3X faster
                      </p>
                    </div>
                    <div className="billing-logo flex items-center justify-center  w-1/3 ">
                      <i className=" text-4xl fa-solid fa-dollar-sign"></i>
                    </div>
                  </div>
                </div>
                <div className="verify shadow-xl p-4 bg-white rounded-xl lg:w-1/2">
                  <p className="ms-7 text-sm text-gray-500">Required to hire</p>
                  <div className="add-billing flex mt-3">
                    <div className="billing-data flex gap-2 items-center w-3/4">
                      <i className="text-xl text-amber-300 fa-sharp-duotone fa-solid fa-check"></i>
                      <p className="text-xl font-thin">
                        You Verified Email Address
                      </p>
                    </div>
                    <div className="billing-logo flex items-center justify-center  w-1/3 ">
                      <i className=" text-4xl fa-solid fa-envelope-open-text"></i>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-job w-1/3  flex justify-end">
              <button
                onClick={handlePostJobClick}
                className={`post-job-button h-fit p-2 px-5 rounded-lg text-lg font-medium ${
                  isVerified
                    ? "bg-amber-300 text-black hover:bg-amber-400"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isVerified}>
                <i className="fa-solid fa-plus"></i> Post a job
              </button>
            </div>
          </div>
          <div className="post-tips flex gap-3">
            <div className="post-job-1 w-1/4 h-80  flex flex-col justify-between py-4 border-2 border-dashed border-gray-300 rounded-xl">
              <div className="first-top mx-7 text-center flex flex-col items-center">
                <i class="text-4xl fa-solid fa-circle-plus"></i>
                <p className="mt-3 text-gray-500 font-semibold">
                  Post A new Job
                </p>
                <p className="mt-3 text-gray-500">
                  Create a new job post and get proposals from talents
                </p>
              </div>
              <div className="second-bottom mx-6">
                <button
                  onClick={handlePostJobClick}
                  className={`p-2 w-full font-medium  rounded-lg ${
                    isVerified
                      ? "text-black bg-amber-300 hover:bg-amber-400 "
                      : "text-gray-500   cursor-not-allowed"
                  }`}
                  disabled={!isVerified}>
                  Post a new job
                </button>
              </div>
            </div>
            <Link
              to={"/recent-posts"}
              className="post-job-2 w-1/4 hover:cursor-pointer hover:scale-95 duration-75 h-80 flex flex-col justify-between py-4 border-2  border-gray-300 rounded-xl">
              <div className="first-top  mx-7  flex flex-col ">
                <div className="flex w-full justify-start">
                  <span>
                    <i class="  fa-regular fa-lightbulb me-2 text-lg font-medium"></i>
                  </span>{" "}
                  <span className="text-lg font-medium"> Quick tips</span>
                </div>
                <p className="text-2xl mt-2 font-medium">My Posts</p>
                <p className="mt-2 text-gray-500">See Posts and Proposals</p>
              </div>
              <div className="second-bottom mx-6">
                <p className="text-amber-300 text-lg">
                  You have {jobs?.length} job posts
                </p>
              </div>
            </Link>
            <div className="post-job-2 w-1/4 hover:cursor-pointer hover:scale-95 duration-75 h-80 flex flex-col justify-between py-4 border-2  border-gray-300 rounded-xl">
              <div className="first-top mx-7  flex flex-col ">
                <div className="flex w-full justify-start">
                  <span>
                    <i class="  fa-regular fa-lightbulb me-2 text-lg font-medium"></i>
                  </span>
                  <span className="text-lg font-medium"> Quick tips</span>
                </div>
                <p className="text-2xl mt-2 font-medium">Stay Safe in Handas</p>
                <p className="mt-2 text-gray-500">
                  We're doing our best to keep you safe, and it's important you
                  learn how to identify and report suspicious activity.
                </p>
              </div>
              <div className="second-bottom mx-6">
                <p className="text-amber-300 text-lg">
                  Learn more about safety
                </p>
              </div>
            </div>{" "}
            <div className="post-job-1 w-1/4 h-80 flex  hover:cursor-pointer hover:scale-95 duration-75  flex-col justify-between py-4 border-2 border-dashed border-gray-300 rounded-xl">
              <div className="first-top mx-7 text-center flex flex-col items-center">
                <i class="text-4xl fa-regular fa-comments"></i>{" "}
                <p className="mt-3 text-gray-500 font-semibold">
                  Message & hire talent directly
                </p>
                <p className="mt-3 text-gray-500">
                  Connect, discuss, and collaborate with top talent instantly.
                </p>
              </div>
              <div className="second-bottom mx-6">
                <Link
                  to={"/engineers-list"}
                  className="p-2 w-full font-medium text-amber-300 border-2 border-amber-300 rounded-lg ">
                  Browse and Message talent{" "}
                </Link>
              </div>
            </div>
          </div>
          <p className="text-3xl block mt-16 mb-6 font-medium">
            Find experts by Specialization
          </p>
          <div className="post-tips-3 mb-6 flex gap-3">
            <div className="post-job-1-3 w-1/4 h-80 flex flex-col justify-between py-4 bg-amber-300 rounded-xl">
              <div className="first-top mx-7 mt-3  flex flex-col items-center">
                <div className="flex w-full justify-start">
                  {" "}
                  <span className="font-medium text-white"> Guided Tour</span>
                </div>
                <p className="text-white text-2xl">
                  Book a 1-on-1 consultation with an expert to review your
                  project's budget, timeline, and scope.
                </p>
              </div>
              <div className="second-bottom mx-6">
                <button className="p-2 w-full font-medium text-amber-300 border-2 border-amber-300 rounded-lg ">
                  Learn more{" "}
                </button>
              </div>
            </div>
            <div className="post-job-1 w-1/4 h-80 flex flex-col justify-center items-center py-4 border-2    border-gray-300 rounded-xl">
              <img src={eng1} className="w-1/2" alt="Structural Engineer" />
              <p className="mt-3 text-2xl font-medium">Structural Engineer</p>
            </div>{" "}
            <div className="post-job-1 w-1/4 h-80 flex flex-col justify-center items-center py-4 border-2    border-gray-300 rounded-xl">
              <img src={eng2} className="w-1/2" alt="Architect" />
              <p className="mt-3 text-2xl font-medium">Architect</p>
            </div>{" "}
            <div className="post-job-1 w-1/4 h-80 flex flex-col justify-center items-center py-4 border-2    border-gray-300 rounded-xl">
              <img src={eng3} className="w-1/2" alt="Consulting Engineer" />
              <p className="mt-3 text-2xl font-medium">Consulting Engineer</p>
            </div>{" "}
          </div>

          <div className="get-start flex p-6 w-full h-48 bg-white shadow-xl rounded-xl">
            <div className="text-data w-2/3 ">
              <p className="text-lg text-gray-600">Get Started</p>
              <p className="text-3xl mt-4">
                Get Started and connect with talent to get work done
              </p>

              <button className="p-2 mt-5 px-7 border border-amber-300 text-amber-300 font-medium rounded-lg">
                {" "}
                Go Article
              </button>
            </div>
            <div className="icons w-1/3 flex justify-end ">
              <img src={start} className="w-1/3" alt="Get Started" />
            </div>
          </div>
          <div className="info my-6 flex gap-4 w-full h-40">
            <div className="payment-1 flex p-6 rounded-xl w-1/3 shadow-xl bg-white h-full ">
              <div className="text-data w-2/3 ">
                <p className="text-sm text-gray-600">Payments</p>
                <p className="text-lg mt-4">
                  Everything you need to know about payments{" "}
                </p>
              </div>
              <div className="icons w-1/3 bg-white flex justify-center ">
                <img src={card} className="w-2/3" alt="Payments" />
              </div>
            </div>
            <div className="payment-1 flex p-6 rounded-xl w-1/3 shadow-xl bg-white h-full ">
              <div className="text-data w-2/3 ">
                <p className="text-sm text-gray-600">Payments</p>
                <p className="text-lg mt-4">
                  How to set up your preferred billing method{" "}
                </p>
              </div>
              <div className="icons w-1/3 bg-white flex justify-center ">
                <img src={card2} className="w-2/3" alt="Billing Method" />
              </div>
            </div>
            <div className="payment-1 flex p-6 rounded-xl w-1/3 shadow-xl bg-white h-full ">
              <div className="text-data w-2/3 ">
                <p className="text-sm text-gray-600">Trust & Safety</p>
                <p className="text-lg mt-4">
                  Keep yourself and others safe on Handas{" "}
                </p>
              </div>
              <div className="icons w-1/3 bg-slate-100 flex justify-center ">
                <img src={network} className="w-2/3" alt="Safety" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
