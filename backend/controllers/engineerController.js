import { Engineer } from "../model/engineerModel.js";
import catchAsync from "../utils/catchAsync.js";
import path from "path";
import fs from "fs";
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
  const { id } = req.params; // Extract the ID from the URL parameters

  const engineer = await Engineer.findById(id).populate({
    path: "user", // Populate the user field
    select: "fullName email role", // Select relevant user fields
  });

  if (!engineer) {
    return res.status(404).json({
      status: "fail",
      message: "No engineer found with that ID",
    });
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

const updateVerificationDocument = catchAsync(async (req, res, next) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res
      .status(404)
      .json({ message: "document update unsuccessful! please try again" });
  }

  const engineerId = "Eng_ID";

  const updatedEngineer = await Engineer.findByIdAndUpdate(
    engineerId,
    {
      verificationDocument: uploadedFile.filename,
    },
    { new: true }
  );
  res.json({ message: "Document updated successfully", updatedEngineer });
});

const getVerificationDocument = catchAsync(async (req, res, next) => {
  const filename = req.params.filename;
  const filePath = path.resolve("tmp/my-uploads/documents", filename);
  console.log(filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found:", filePath);
      return res.status(404).json({ error: "File not found" });
    }

    // Send the file to the front-end
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error sending the file");
      }
    });
  });
});

export {
  updateEducation,
  addTitle,
  addSkill,
  addOverview,
  addEducation,
  getAllEngineers,
  getSavedJobs,
  saveJob,
  getEngineerById,
  updateVerificationDocument,
  getVerificationDocument,
};
