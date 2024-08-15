import { Router } from 'express';
import { getAllTasks, createTask, updateTask } from './taskController';
import {verifyTokenForLogin} from '../auth/verifyToken'; // Adjust path as necessary
import { urlToHttpOptions } from 'url';

const router = Router();

// Apply the verifyToken middleware to routes that need protection
router.post('/tasks/', verifyTokenForLogin, createTask); // Route to create a new team
router.get('/tasks/:teamID', verifyTokenForLogin,getAllTasks); // Route to get a specific team by ID
router.put('/tasks/:taskID', verifyTokenForLogin, updateTask)

export default router;
