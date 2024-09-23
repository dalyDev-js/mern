import { Client } from "../model/clientModel.js";
import Service from "../model/serviceModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllServices = catchAsync(async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
});
export const getAllServicesByClient = catchAsync(async (req, res, next) => {
  const clientId = req.body.clientId;

  if (!clientId) {
    return next(new AppError("Client ID not provided", 400));
  }

  const services = await Service.find({ client: clientId });

  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
});

export const getServiceById = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new AppError(`No service found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const createService = catchAsync(async (req, res, next) => {
  const { client, title, budget, description, skills, level } = req.body;

  // Check if the client ID is provided
  if (!client) {
    return next(new AppError("Client ID is required to post a service", 400));
  }

  // Create the service/job
  const newService = await Service.create({
    title,
    budget,
    description,
    skills,
    level,
    client, // Attach the client ID to the service
  });

  // Push the service to the client's postedProjects array
  await Client.findByIdAndUpdate(client, {
    $push: { postedProjects: { service: newService._id } },
  });

  res.status(201).json({
    status: "success",
    data: {
      service: newService,
    },
  });
});

export const getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new AppError(`No service Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const updateService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return next(
      new AppError(`No service Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

export const deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return next(
      new AppError(`No service Found with this id : ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
