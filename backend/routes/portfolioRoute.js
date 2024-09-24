import express from "express";
import {
  addPortofolio,
  deletePortfolio,
  getPortfolios,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import { validation } from "../middleware/validation.js";
import {
  portfolioSchema,
  idSchema,
} from "../validation/portfolio/addPortfolioValidation.js";
import portfolioUpload from "../middleware/uploads/portfolioUpload.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/:id", getPortfolios);

portfolioRouter.post(
  "/:id",
  validation(idSchema, "params"),
  portfolioUpload.single("image"),
  validation(portfolioSchema, "body"),
  addPortofolio
);

portfolioRouter.put(
  "/:id",
  portfolioUpload.single("image"),
  validation(portfolioSchema, "body"),
  updatePortfolio
);

portfolioRouter.delete("/:id", deletePortfolio);

export default portfolioRouter;
