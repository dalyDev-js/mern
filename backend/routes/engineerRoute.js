import express from "express";
import {
  addCertificate,
  addEducation,
  addPortofolio,
  addSavedJob,
  getSavedJobs,
  removeSavedJob,
  saveJob,
} from "../controllers/engineerController.js";
import { upload } from "../middleware/uploads/portfolioUpload.js";
import { protect } from "../middleware/protectRoute.js";

const engineerRouters = express.Router();

engineerRouters.put("/addeducation/:id", addEducation);
engineerRouters.put(
  "/addcertificate/:id",
  upload.single("file"),
  addCertificate
);
engineerRouters.post("/save", protect, saveJob);
engineerRouters.get("/saved", protect, getSavedJobs);

export default engineerRouters;
