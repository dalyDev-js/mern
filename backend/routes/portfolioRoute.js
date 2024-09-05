import express from "express";
import {
  addPortofolio,
  deletePortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import { validation } from "../middleware/validation.js";
import portfolioSchema from "../validation/portfolio/addPortfolioValidation.js";
import portfolioUpload from "../middleware/uploads/portfolioUpload.js";

const portfolioRouters = express.Router();

portfolioRouters.post(
  "/",
  portfolioUpload.single("image"),
  validation(portfolioSchema, "body"),
  addPortofolio
);

portfolioRouters.put(
  "/:id",
  portfolioUpload.single("image"),
  validation(portfolioSchema, "body"),
  updatePortfolio
);

portfolioRouters.delete("/:id", deletePortfolio);

export default portfolioRouters;
