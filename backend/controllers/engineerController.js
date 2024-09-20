import { Engineer } from "../model/engineerModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../model/userModel.js";
// const getAllEngineers = (async(req,res,next)=>{
//     let engineers = await Engineer.find()
//     res.status(200).json({message:"Success",engineers})
// })

const getAllEngineers = catchAsync(async (req, res, next) => {
  // Populate 'user' and filter only users whose role is 'engineer'
  const engineers = await Engineer.find().populate({
    path: "user",
    select: "fullName email role", // Select relevant fields
    match: { role: "engineer" }, // Only include users with role 'engineer'
  });

  // Filter out any engineers where the user didn't match (role isn't 'engineer')
  const filteredEngineers = engineers.filter(
    (engineer) => engineer.user !== null
  );

  res.status(200).json({
    status: "success",
    results: filteredEngineers.length,
    data: {
      engineers: filteredEngineers,
    },
  });
});

const getEngineerById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  console.log("User ID received:", userId); // Debugging: Check if userId is passed

  // Attempt to find an engineer by the user ID and populate the user data
  const engineer = await Engineer.findOne({ user: userId }).populate("user");

  if (!engineer) {
    console.log("Engineer not found for user ID:", userId); // Debugging: Log if no engineer is found
    return next(new AppError("Engineer not found with this user ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      engineer,
    },
  });
});

const updateEducation = async (req, res, next) => {
  let engineerId = req.user.id; //user id from token
  let engineerEducation = await Engineer.findByIdAndUpdate(
    engineerId,
    {
      education: {
        title: req.body.title,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Education added successfully", engineerEducation });
};

const addTitle = async (req, res, next) => {
  let engineerId = req.user.id;
  let engineerTitle = await Engineer.findByIdAndUpdate(
    engineerId,
    { title: req.body.title },
    { new: true }
  );
  res.status(200).json({ message: "Title added successfully", engineerTitle });
};

const addSkill = catchAsync(async (req, res, next) => {
  let engineerId = req.user.id;
  let { skillsToAdd } = req.body;
  const engineerSkill = await Engineer.findByIdAndUpdate(
    engineerId,
    { skills: { skillsToAdd } },
    { new: true }
  );

  res.json({ message: "Skills:", engineerSkill });
});

// frontend will update the skills array and save them in the database

const addOverview = async (req, res, next) => {
  let engineerId = req.user.id;
  const { profileOverview } = req.body;

  if (!profileOverview) {
    return res.status(400).json({ message: "Profile Overview is required." });
  }
  await Engineer.findByIdAndUpdate(
    engineerId,
    { overview: req.body.overview },
    { new: true }
  );
  res.status(200).json({ message: "Overview added successfully" });
};

const addEducation = catchAsync(async (req, res, next) => {
  const { title, startDate, endDate } = req.body;

  if (!title || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Title, Start Date, and End Date are required." });
  }

  const engineerId = req.user.id;

  const updatedEngineer = await Engineer.findByIdAndUpdate(
    engineerId,
    {
      education: {
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    },
    { new: true }
  );
  res.json({ message: "Education added successfully", updatedEngineer });
});

// Save a service (job) to an engineer's saved jobs
const saveJob = catchAsync(async (req, res, next) => {
  const { engineerId, serviceId } = req.body; // Engineer ID and Service ID from the request body

  if (!engineerId || !serviceId) {
    return res.status(400).json({
      status: "fail",
      message: "Engineer ID and Service ID are required.",
    });
  }

  // Add the service to the saved jobs array
  const updatedEngineer = await Engineer.findByIdAndUpdate(
    engineerId,
    { $addToSet: { savedJobs: serviceId } }, // Prevents duplicates
    { new: true }
  ).populate("savedJobs"); // Populates saved service details if necessary

  res.status(200).json({
    status: "success",
    data: {
      engineer: updatedEngineer,
    },
  });
});

// Get all saved services (jobs) for an engineer
const getSavedJobs = catchAsync(async (req, res, next) => {
  const engineerId = req.user._id;

  const engineer = await Engineer.findById(engineerId).populate("savedJobs"); // Populate saved service details

  res.status(200).json({
    status: "success",
    data: {
      savedJobs: engineer.savedJobs,
    },
  });
});

// Update engineer profile by ID
const updateEngineer = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  console.log("User ID:", userId);
  console.log("Request body:", req.body);

  // Check if there is a 'fullName' in the request body and update the User model
  if (req.body.fullName) {
    await User.findByIdAndUpdate(
      userId,
      { fullName: req.body.fullName },
      {
        new: true, // Return the updated User document
        runValidators: true, // Ensure that the update follows the schema rules
      }
    );
  }

  // Handle profilePic upload, if file exists
  if (req.file) {
    const profilePicUrl = `https://some-cloud-storage.com/${req.file.originalname}`; // Process and get URL after uploading to a cloud storage
    req.body.profilePic = profilePicUrl; // Attach the processed profilePic URL to the request body
    // You can implement cloud storage upload logic here to get the URL
  }

  // Update the Engineer document
  const engineer = await Engineer.findOneAndUpdate({ user: userId }, req.body, {
    new: true,
    runValidators: true,
  }).populate("user"); // Populate the 'user' field

  if (!engineer) {
    return next(new AppError("Engineer not found for this user ID", 404));
  }

  // Return the updated engineer with populated user data
  res.status(200).json({
    status: "success",
    data: {
      engineer,
    },
  });
});

export {
  updateEngineer,
  updateEducation,
  addTitle,
  addSkill,
  addOverview,
  addEducation,
  getAllEngineers,
  getSavedJobs,
  saveJob,
  getEngineerById,
};
