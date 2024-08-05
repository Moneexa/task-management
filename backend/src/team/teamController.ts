import { Request, Response } from 'express';
import Team from './teamModel'; // Adjust path as necessary
import User from '../user/userModel'; // Adjust path as necessary

export const createTeam = async (req: Request, res: Response) => {
    try {
        const { name, members } = req.body; // emails should be an array of user emails

        // Find user IDs based on the provided emails
        const users = await User.find({ email: { $in: members } }).select('_id');

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with the provided emails.' });
        }

        const newTeam = new Team({
            name,
            emails: users.map(user => user._id), // Store the ObjectId of each user
        });

        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await Team.find().populate('emails'); // Populate user details based on ObjectId
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const team = await Team.findById(id).populate('emails'); // Populate user details based on ObjectId

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
