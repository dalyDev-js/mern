import { Engineer } from "../model/engineerModel.js";

// const getAllEngineers = (async(req,res,next)=>{
//     let engineers = await Engineer.find()
//     res.status(200).json({message:"Success",engineers})
// })

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

const addSkill = async (req, res, next) => {
  let engineerId = req.user.id;
  let { skillsToAdd } = req.body;
  const engineerSkill = await Engineer.findByIdAndUpdate(
    engineerId,
    { skills: { skillsToAdd } },
    { new: true }
  );

  res.json({ message: "Skills:", engineerSkill });
};

export const saveJob = async (req, res) => {
  const { jobId } = req.body;
  const engineerId = req.user._id; // Assuming the authenticated user is an engineer

  try {
    // Check if the job is already saved
    const alreadySaved = await SavedJob.findOne({ engineerId, jobId });

    if (alreadySaved) {
      return res.status(400).json({ message: "Job already saved." });
    }

    // Save the job
    const savedJob = new SavedJob({
      engineerId,
      jobId,
    });

    await savedJob.save();
    res.status(201).json({ message: "Job saved successfully.", savedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const engineerId = req.params.id;

    const engineer = await Engineer.findById(engineerId).populate("savedJobs");

    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    res.status(200).json({ savedJobs: engineer.savedJobs });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const engineerId = req.params.id;
    const jobId = req.params.jobId;

    const engineer = await Engineer.findById(engineerId);

    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    if (!engineer.savedJobs.includes(jobId)) {
      return res.status(404).json({ message: "Job not found in saved jobs" });
    }

    engineer.savedJobs = engineer.savedJobs.filter(
      (job) => job.toString() !== jobId
    );

    await engineer.save();

    res.status(200).json({
      message: "Job removed from saved jobs",
      savedJobs: engineer.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export {
  updateEducation,
  addTitle,
  addSkill,
  addSavedJob,
  getSavedJobs,
  removeSavedJob,
};
