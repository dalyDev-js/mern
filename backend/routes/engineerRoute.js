import express from "express";
import {
  addEducation,
  addOverview,
  addSkill,
  addTitle,
  getAllEngineers,
  getEngineerById,
  getEngineerByUserId,
  getSavedJobs,
  saveJob,
  updateEngineer,
} from "../controllers/engineerController.js";
import { upload } from "../utils/multer.js";

const engineerRouters = express.Router();
engineerRouters.get("/all", getAllEngineers);
engineerRouters.get("/:id", getEngineerById);
engineerRouters.get("/userid/:userId", getEngineerByUserId);
engineerRouters.put("/addeducation", addEducation);
engineerRouters.post("/addskill", addSkill);
engineerRouters.post("/addtitle", addTitle);
engineerRouters.post("/addoverview", addOverview);
engineerRouters.post("/savejob", saveJob);
engineerRouters.get("/savedjobs", getSavedJobs);
engineerRouters.put("/updateEngineer/:userId", updateEngineer);
engineerRouters.put(
  "/updateEngineer/:userId",
  upload.single("profilePic"),
  updateEngineer
);
export default engineerRouters;
