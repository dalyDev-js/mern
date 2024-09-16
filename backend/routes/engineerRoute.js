import express from "express";
import {
  addCertificate,
  addEducation,
  addPortofolio,
} from "../controllers/engineerController.js";
import { upload } from "../middleware/uploads/portfolioUpload.js";

const engineerRouters = express.Router();

engineerRouters.put("/addeducation/:id", addEducation);
engineerRouters.put(
  "/addcertificate/:id",
  upload.single("file"),
  addCertificate
);

export default engineerRouters;
