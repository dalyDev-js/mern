const SavedJob = require("../model/savedJobModel"); // Your Mongoose model for saved jobs
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Save a job
exports.saveJob = catchAsync(async (req, res, next) => {
  const { engineerId } = req.params;
  const { jobId } = req.body;

  // Check if the job is already saved
  const existingJob = await SavedJob.findOne({ engineerId, jobId });
  if (existingJob) {
    return next(new AppError("Job already saved!", 400));
  }

  // Save the job
  const savedJob = await SavedJob.create({ engineerId, jobId });

  res.status(201).json({
    status: "success",
    data: savedJob,
  });
});

// Get all saved jobs for a specific engineer
exports.getSavedJobs = catchAsync(async (req, res, next) => {
  const { engineerId } = req.params;

  // Find all saved jobs by engineerId
  const savedJobs = await SavedJob.find({ engineerId }).populate("jobId");

  res.status(200).json({
    status: "success",
    data: savedJobs,
  });
});
