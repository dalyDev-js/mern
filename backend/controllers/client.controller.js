import { Client } from "../model/clientModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../model/userModel.js";

// Get all clients
const getAllClients = catchAsync(async (req, res, next) => {
  // Populate 'user' and filter only users whose role is 'client'
  const clients = await Client.find().populate({
    path: "user",
    select: "fullName email role", // Select relevant fields
    match: { role: "client" }, // Only include users with role 'client'
  });

  // Filter out any clients where the user didn't match (role isn't 'client')
  const filteredClients = clients.filter((client) => client.user !== null);

  res.status(200).json({
    status: "success",
    results: filteredClients.length,
    data: {
      clients: filteredClients,
    },
  });
});

// Get client by ID
const getClientById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  console.log("User ID received:", userId); // Debugging: Check if userId is passed

  // Attempt to find a client by the user ID and populate the user data
  const client = await Client.findOne({ user: userId }).populate("user");

  if (!client) {
    console.log("Client not found for user ID:", userId); // Debugging: Log if no client is found
    return next(new AppError("Client not found with this user ID", 404));
  }

  client.user.profilePic = `http://localhost:8000/my-uploads/users/${client.user.profilePic}`;

  res.status(200).json({
    status: "success",
    data: {
      client,
    },
  });
});

// Update client profile by ID
const updateClient = catchAsync(async (req, res, next) => {
  const clientId = req.user._id; // Assume req.user has the authenticated client ID
  const { overview } = req.body; // Client sends updated overview in the body

  const updatedClient = await Client.findByIdAndUpdate(
    clientId,
    { overview }, // Update only the overview field
    { new: true }
  );

  if (!updatedClient) {
    return next(new AppError("Client not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { client: updatedClient },
  });
});

// Add or update the client overview
const addOverview = catchAsync(async (req, res, next) => {
  const clientId = req.user.id;
  const { profileOverview } = req.body;

  if (!profileOverview) {
    return res.status(400).json({ message: "Profile Overview is required." });
  }
  const updatedClient = await Client.findByIdAndUpdate(
    clientId,
    { overview: req.body.overview },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      client: updatedClient,
    },
  });
});

// Get all posted projects for a client
const getPostedProjects = catchAsync(async (req, res, next) => {
  const clientId = req.user._id;

  const client = await Client.findById(clientId).populate("postedProjects"); // Populate posted service details

  res.status(200).json({
    status: "success",
    data: {
      postedProjects: client.postedProjects,
    },
  });
});

// Save a service (job) to a client's saved projects
const saveProject = catchAsync(async (req, res, next) => {
  const { clientId, serviceId } = req.body;

  if (!serviceId || !clientId) {
    return res
      .status(400)
      .json({ message: "Service ID and Client ID are required." });
  }

  const client = await Client.findById(clientId);
  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  const alreadySaved = client.savedProjects.find(
    (project) => project.service.toString() === serviceId
  );
  if (alreadySaved) {
    return res.status(400).json({ message: "Project already saved." });
  }

  client.savedProjects.push({ service: serviceId });
  await client.save();

  res.status(200).json({
    status: "success",
    data: {
      savedProjects: client.savedProjects,
    },
  });
});

// Remove a saved project for a client
const removeSavedProject = catchAsync(async (req, res, next) => {
  const { clientId, serviceId } = req.body;

  if (!serviceId || !clientId) {
    return res
      .status(400)
      .json({ message: "Service ID and Client ID are required." });
  }

  const client = await Client.findById(clientId);
  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  client.savedProjects = client.savedProjects.filter(
    (project) => project.service.toString() !== serviceId
  );

  await client.save();

  res.status(200).json({
    status: "success",
    data: {
      savedProjects: client.savedProjects,
    },
  });
});

export {
  getAllClients,
  getClientById,
  updateClient,
  addOverview,
  getPostedProjects,
  saveProject,
  removeSavedProject,
};
