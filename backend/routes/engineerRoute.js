import express from "express";
import {
  addCertificate,
  addEducation,
  addPortofolio,
  getAllEngineers,
} from "../controllers/engineerController.js";
import { upload } from "../middleware/fileUpload.js";

const engineerRouters = express.Router();

engineerRouters.get("/getAllEngineers",getAllEngineers);
engineerRouters.put("/addportfolio/:id", addPortofolio);
engineerRouters.put("/addeducation/:id", addEducation);
engineerRouters.put(
  "/addcertificate/:id",
  upload.single("file"),
  addCertificate
);

export default engineerRouters;
