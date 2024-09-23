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
  } = req.body;

  // Ensure all required fields are present
  if (
    !service ||
    !engineer ||
    !client ||
    !paymentAmount ||
    !startDate ||
    !endDate ||
    !paymentOption ||
    !contractTitle
  ) {
    return next(new AppError("All fields are required", 400));
  }

  // Verify that the service, engineer, and client exist
  const existingService = await Service.findById(service);
  if (!existingService) return next(new AppError("Service not found", 404));

  const existingEngineer = await Engineer.findById(engineer);
  if (!existingEngineer) return next(new AppError("Engineer not found", 404));

  const existingClient = await Client.findById(client);
  if (!existingClient) return next(new AppError("Client not found", 404));

  // Create the new contract
  const newContract = await Contract.create({
    service,
    engineer,
    client,
    paymentAmount,
    startDate,
    endDate,
    status,
    paymentOption,
    contractTitle,
  });

  // Add the contract to the engineer and client
  existingEngineer.activeContracts.push(newContract._id);
  existingClient.activeContracts.push(newContract._id);
  await existingEngineer.save();
  await existingClient.save();

  res.status(201).json({
    status: "success",
    data: {
      contract: newContract,
    },
  });
});

// Get contract by ID
export const getContractById = catchAsync(async (req, res, next) => {
  const contract = await Contract.findById(req.params.id)
    .populate("service")
    .populate("engineer")
    .populate("client");

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
