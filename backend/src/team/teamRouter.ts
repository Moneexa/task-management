import { Router } from 'express';
import { createTeam, getAllTeams, getTeamById } from './teamController'; // Adjust path as necessary
import {verifyTokenForLogin} from '../auth/verifyToken'; // Adjust path as necessary

const router = Router();

// Apply the verifyToken middleware to routes that need protection
router.post('/teams', verifyTokenForLogin, createTeam); // Route to create a new team
router.get('/teams', verifyTokenForLogin, getAllTeams); // Route to get all teams
router.get('/teams/:id', verifyTokenForLogin, getTeamById); // Route to get a specific team by ID

export default router;
