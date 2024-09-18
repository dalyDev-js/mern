import express from "express";
import {

  addEngineer,
  // addPortofolio,
  getAllEngineers,
} from "../controllers/engineerController.js";
// import { upload } from "../middleware/uploads/portfolioUpload.js";

const engineerRouters = express.Router();

engineerRouters.post("/addEngineer",addEngineer)
engineerRouters.get("/getAllEngineers",getAllEngineers)
// engineerRouters.put("/addeducation/:id", addEducation);
// engineerRouters.put(
//   "/addcertificate/:id",
//   upload.single("file"),
//   addCertificate
// );

export default engineerRouters;
