import express from "express";
import {
  getAllClients,
  getClientById,
  updateClient,
  addOverview,
  getPostedProjects,
  saveProject,
  removeSavedProject,
} from "../controllers/client.controller.js";

const clientRouter = express.Router();

clientRouter.get("/", getAllClients);
clientRouter.get("/:userId", getClientById);
clientRouter.patch("/:userId", updateClient);
clientRouter.post("/overview", addOverview);
clientRouter.get("/:clientId/projects", getPostedProjects);
clientRouter.post("/saveproject", saveProject);
clientRouter.delete("/removeproject", removeSavedProject);

export default clientRouter;
