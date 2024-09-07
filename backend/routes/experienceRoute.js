import express from 'express';
import { addExperience, deleteExperience, updateExperience } from '../controllers/exprienceController.js';

const experienceRouter = express.Router();



experienceRouter.post('/',addExperience)
experienceRouter.put('/:id',updateExperience)
experienceRouter.delete('/:id',deleteExperience)



export default experienceRouter