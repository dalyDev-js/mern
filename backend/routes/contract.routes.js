import express from "express";
import {
  createContract,
  getContractById,
  updateContract,
  deleteContract,
  getAllContracts,
  checkExistingContract,
  getContractsByEngineerId,
  getContractsByClientId,
} from "../controllers/contract.controllers.js";

const contractRouter = express.Router();
contractRouter.route("/").post(createContract).get(getAllContracts);
contractRouter.get("/check", checkExistingContract);
contractRouter
  .route("/:id")
  .get(getContractById)
  .patch(updateContract)
  .delete(deleteContract);
contractRouter.get("/client/:clientId", getContractsByClientId);

contractRouter.get("/engineer/:engineerId", getContractsByEngineerId);
export default contractRouter;
