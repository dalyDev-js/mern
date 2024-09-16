import express from 'express';
import { addProposal, updateProposal } from '../controllers/proposalController.js';


const proposalRouter = express.Router();

proposalRouter.post('/addproposal', addProposal)
proposalRouter.put('/updateproposal/:id', updateProposal)

export default proposalRouter;