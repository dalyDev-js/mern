import express from 'express';
import { getAllProposals } from '../controllers/client.controller.js';


const clientRouter = express.Router();


clientRouter.get('/getAllProposals',getAllProposals)


export default clientRouter;