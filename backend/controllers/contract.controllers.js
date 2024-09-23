import Contract from "../model/contractModel.js";
import { Engineer } from "../model/engineerModel.js";

import Service from "../model/serviceModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { Client } from "../model/clientModel.js";

// Create a new contract
export const createContract = catchAsync(async (req, res, next) => {
  const {
    service,
    engineer,
    client,
    paymentAmount,
    startDate,
    endDate,
    status,
    paymentOption,
    contractTitle,
    description,
  } = req.body;

  // Validate fields
  if (
    !service ||
    !engineer ||
    !client ||
    !paymentAmount ||
    !startDate ||
    !endDate ||
    !paymentOption ||
    !description ||
    !contractTitle
  ) {
    return next(new AppError("All fields are required", 400));
  }

  const existingService = await Service.findById(service);
  if (!existingService) return next(new AppError("Service not found", 404));

  const existingEngineer = await Engineer.findById(engineer);
  if (!existingEngineer) return next(new AppError("Engineer not found", 404));

  const existingClient = await Client.findOne({ user: client });
  if (!existingClient) return next(new AppError("Client not found", 404));

  // Create the contract
  const newContract = await Contract.create({
    service,
    engineer,
    client: existingClient._id,
    paymentAmount,
    startDate,
    endDate,
    status,
    paymentOption,
    description,
    contractTitle,
  });

  // Add service and contract to activeContracts in both engineer and client
  existingEngineer.activeContracts.push({ service, contract: newContract._id });
  existingClient.activeContracts.push({ service, contract: newContract._id });
  await existingEngineer.save();
  await existingClient.save();

  res.status(201).json({
    status: "success",
    data: { contract: newContract },
  });
});
// check contract exists

export const checkExistingContract = catchAsync(async (req, res, next) => {
  const { service, engineer, client } = req.query;

  console.log("Service ID:", service);
  console.log("Engineer ID:", engineer);
  console.log("Client ID:", client);

  try {
    // Fetch the engineer and client with active contracts populated
    const existingEngineer = await Engineer.findOne({
      user: engineer,
    }).populate("activeContracts.contract activeContracts.service");
    const existingClient = await Client.findOne({ user: client }).populate(
      "activeContracts.contract activeContracts.service"
    );

    // Check if the engineer was found
    if (!existingEngineer) {
      console.error("Engineer not found with ID:", engineer);
      return res.status(404).json({ message: "Engineer not found" });
    }

    // Check if the engineer has active contracts
    if (
      !existingEngineer.activeContracts ||
      existingEngineer.activeContracts.length === 0
    ) {
      console.error("Engineer has no active contracts.");
      return res.status(200).json({ exists: false });
    }

    // Check if the client was found
    if (!existingClient) {
      console.error("Client not found with ID:", client);
      return res.status(404).json({ message: "Client not found" });
    }

    // Check if the client has active contracts
    if (
      !existingClient.activeContracts ||
      existingClient.activeContracts.length === 0
    ) {
      console.error("Client has no active contracts.");
      return res.status(200).json({ exists: false });
    }

    // Log the active contracts for both the engineer and client
    console.log(
      "Existing Engineer Contracts:",
      existingEngineer.activeContracts
    );
    console.log("Existing Client Contracts:", existingClient.activeContracts);

    // Check if the engineer has a contract for the given service
    const engineerHasContract = existingEngineer.activeContracts.some(
      (contract) => {
        if (!contract || !contract.service) {
          console.error(
            "Contract or service is undefined for engineer contract."
          );
          return false;
        }
        // Explicitly convert to string and compare
        const engineerServiceId = contract.service._id
          ? contract.service._id.toString()
          : contract.service.toString();
        console.log(
          "Comparing engineer service:",
          engineerServiceId,
          "with",
          service
        );
        return engineerServiceId === service;
      }
    );

    // Check if the client has a contract for the given service
    const clientHasContract = existingClient.activeContracts.some(
      (contract) => {
        if (!contract || !contract.service) {
          console.error(
            "Contract or service is undefined for client contract."
          );
          return false;
        }
        // Explicitly convert to string and compare
        const clientServiceId = contract.service._id
          ? contract.service._id.toString()
          : contract.service.toString();
        console.log(
          "Comparing client service:",
          clientServiceId,
          "with",
          service
        );
        return clientServiceId === service;
      }
    );

    // If both the engineer and client have a contract for the same service, return true
    if (engineerHasContract && clientHasContract) {
      return res.status(200).json({ exists: true });
    }

    // If no contract was found for the given service, return false
    return res.status(200).json({ exists: false });
  } catch (err) {
    console.error("Error checking existing contract:", err);
    return next(err);
  }
});

// Get contract by ID
export const getContractById = catchAsync(async (req, res, next) => {
  const contract = await Contract.findById(req.params.id)
    .populate("service")
    .populate("engineer")
    .populate("user");
  console.log(req.params.id);
  if (!contract) {
    return next(new AppError("No contract found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      contract,
    },
  });
});

// Get all contracts
export const getAllContracts = catchAsync(async (req, res, next) => {
  const contracts = await Contract.find()
    .populate("service")
    .populate("engineer")
    .populate("client");

  res.status(200).json({
    status: "success",
    data: {
      contracts,
    },
  });
});

// Update contract by ID
export const updateContract = catchAsync(async (req, res, next) => {
  const updatedContract = await Contract.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedContract) {
    return next(new AppError("No contract found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      contract: updatedContract,
    },
  });
});

// Delete contract
export const deleteContract = catchAsync(async (req, res, next) => {
  const contract = await Contract.findByIdAndDelete(req.params.id);

  if (!contract) {
    return next(new AppError("No contract found with this ID", 404));
  }

  // Remove the contract from the engineer and client activeContracts
  await Engineer.updateMany(
    { activeContracts: contract._id },
    { $pull: { activeContracts: contract._id } }
  );
  await Client.updateMany(
    { activeContracts: contract._id },
    { $pull: { activeContracts: contract._id } }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getContractsByEngineerId = catchAsync(async (req, res, next) => {
  const { engineerId } = req.params;

  // Find engineer by user ID and populate their active contracts
  const engineer = await Engineer.findOne({ user: engineerId }).populate({
    path: "activeContracts.contract",
    populate: [
      { path: "user", model: "Client" }, // Populate client within the contract
      { path: "service", model: "Service" }, // Populate service within the contract
    ],
  });

  if (!engineer) {
    return next(new AppError("Engineer not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      contracts: engineer.activeContracts,
    },
  });
});

// Get contracts by client ID (user ID)
export const getContractsByClientId = catchAsync(async (req, res, next) => {
  const { clientId } = req.params;

  // Find client by user ID and populate their active contracts
  const client = await Client.findOne({ user: clientId }).populate({
    path: "activeContracts.contract",
    populate: [
      { path: "engineer", model: "Engineer" }, // Populate engineer within the contract
      { path: "service", model: "Service" }, // Populate service within the contract
    ],
  });

  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      contracts: client.activeContracts,
    },
  });
});
