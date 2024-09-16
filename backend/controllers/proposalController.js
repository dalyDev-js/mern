import { Proposal } from "../model/proposalModel.js";
import catchAsync from "../utils/catchAsync.js";

const addProposal = catchAsync(async (req, res, next) => {
  const { content, budget, service } = req.body;
  const engineer = req.user.id;
  if (!content || !service || !budget || !engineer)
    res.status(404).json({ message: "Complete required fields" });
  await Proposal.create({ content, budget, service, engineer });
  res.status(201).json({ message: "Proposal added successfully" });
});

const updateProposal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const engineer = req.user.id;
  const { content, budget, service } = req.body;
  if (!(await Proposal.findOne({ engineer, _id: id }))) {
    res.status(404).json({ message: "Proposal not found" });
  }

  const proposal = await Proposal.findByIdAndUpdate(
    id,
    { content, budget, service },
    { new: true }
  );
  if (!proposal) return res.status(404).json({ message: "Proposal not found" });
  res.status(200).json({ message: "Proposal updated successfully", proposal });
});

export { addProposal, updateProposal };
