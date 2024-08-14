import { Router } from 'express';
import { getAllTasks, createTask } from './taskController';
import {verifyTokenForLogin} from '../auth/verifyToken'; // Adjust path as necessary

const router = Router();

// Apply the verifyToken middleware to routes that need protection
router.post('/tasks/', verifyTokenForLogin, createTask); // Route to create a new team
router.get('/tasks/:teamID', verifyTokenForLogin,getAllTasks); // Route to get a specific team by ID

export default router;
