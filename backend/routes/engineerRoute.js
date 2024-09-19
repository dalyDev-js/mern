import express from "express";
import {
  addEducation,
  addOverview,
  addSkill,
  addTitle,
} from "../controllers/engineerController.js";

const engineerRouters = express.Router();

engineerRouters.put("/addeducation", addEducation);
engineerRouters.post("/addskill", addSkill);
engineerRouters.post("/addtitle", addTitle);
engineerRouters.post("/addoverview", addOverview);

export default engineerRouters;
