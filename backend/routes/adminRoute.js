import express from 'express';
import { superAdminLogin } from '../controllers/admin-authController.js';

const adminRouter = express.Router();

adminRouter.post('/adminlogin',superAdminLogin)

export default adminRouter;