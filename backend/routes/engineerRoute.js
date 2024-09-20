import express from "express";
import {
  addEducation,
  addOverview,
  addSkill,
  addTitle,
  getAllEngineers,
} from "../controllers/engineerController.js";

const engineerRouters = express.Router();
engineerRouters.get("/all", getAllEngineers);
engineerRouters.put("/addeducation", addEducation);
engineerRouters.post("/addskill", addSkill);
engineerRouters.post("/addtitle", addTitle);
engineerRouters.post("/addoverview", addOverview);

export default engineerRouters;
