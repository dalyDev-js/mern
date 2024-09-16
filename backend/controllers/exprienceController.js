import { Experience } from "../model/experienceModel.js";
import catchAsync from "../utils/catchAsync.js";

const addExperience = catchAsync(async (req, res) => {
  const { title, company, startDate, endDate, tillNow, description } = req.body;
  let engineerExperience = await Experience.create({
    title: title,
    company: company,
    startDate: startDate,
    endDate: !tillNow ? endDate : null,
    tillNow: tillNow,
    description: description,
  });
  res.status(200).json(
    {
      message: "Experience added successfully!",
    },
    engineerExperience
  );
});

const updateExperience = catchAsync(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!experience)
    return res.status(404).json({ message: "Experience not found." });
  res
    .status(200)
    .json({ message: "Experience updated successfully!", experience });
});

const deleteExperience = catchAsync(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience)
    return res.status(404).json({ message: "Experience not found." });
  res.status(200).json({ message: "Experience deleted successfully!" });
});

export { addExperience, updateExperience, deleteExperience };
