import { Engineer } from "../model/engineerModel.js";
import { Proposal } from "../model/proposalModel.js";

import catchAsync from "../utils/catchAsync.js";

const addProposal = catchAsync(async (req, res, next) => {
  const { content, budget, service, engineerId } = req.body;
  console.log("Received Proposal Data:", req.body);
  // Validate input
  if (!content || !service || !budget || !engineerId) {
    return res.status(400).json({ message: "Complete all required fields" });
  }

  // Fetch the engineer
  const engineer = await Engineer.findById(engineerId);

  if (!engineer) {
    return res.status(404).json({ message: "Engineer not found." });
  }

  // Check if the proposal already exists in the engineer's submitted proposals
  const existingProposal = engineer.submittedProposals.find(
    () => service.toString() === service
  );

  if (existingProposal) {
    return res.status(400).json({
      message: "You have already submitted a proposal for this job.",
    });
  }

  // Add the new proposal to the engineer's submitted proposals
  engineer.submittedProposals.push({
    service,
  });

  // Save the engineer with the updated submitted proposals
  await engineer.save();

  console.log(
    "Successfully updated submitted proposals:",
    engineer.submittedProposals
  );

  // Respond with the updated submitted proposals
  res.status(201).json({
    message: "Proposal added successfully",
    submittedProposals: engineer.submittedProposals, // Return updated proposals
  });
});

const updateProposal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const engineer = req.user.id;
  const { content, budget, service } = req.body;

  const proposal = await Proposal.findOneAndUpdate(
    { engineer, _id: id },
    { content, budget, service },
    { new: true }
  );

  if (!proposal) return res.status(404).json({ message: "Proposal not found" });
  res.status(200).json({ message: "Proposal updated successfully", proposal });
});

const getProposalsByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const proposals = await Proposal.find({ engineer: userId });

  if (!proposals.length)
    return res.status(404).json({ message: "No proposals found" });
  res.status(200).json({ proposals });
});

export { addProposal, updateProposal, getProposalsByUserId };
