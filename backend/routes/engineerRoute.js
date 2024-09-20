import express from "express";
import {
  addEducation,
  addOverview,
  addSkill,
  addTitle,
  getAllEngineers,
  getEngineerById,
  getSavedJobs,
  saveJob,
} from "../controllers/engineerController.js";

const engineerRouters = express.Router();
engineerRouters.get("/all", getAllEngineers);
engineerRouters.get("/:id", getEngineerById);
engineerRouters.put("/addeducation", addEducation);
engineerRouters.post("/addskill", addSkill);
engineerRouters.post("/addtitle", addTitle);
engineerRouters.post("/addoverview", addOverview);
engineerRouters.post("/savejob", saveJob);
engineerRouters.get("/savedjobs", getSavedJobs);
export default engineerRouters;
