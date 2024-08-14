import { Request, Response } from 'express';
import Team from './teamModel'; // Adjust path as necessary
import User from '../user/userModel'; // Adjust path as necessary
import mongoose from 'mongoose';


 interface AuthenticatedRequest extends Request {
    user?: {
        email: string;
    };
}


export const createTeam = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, members } = req.body; // emails should be an array of user emails
        const email=req.user?.email
        members.push(email)
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

export const getAllTeams = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const email=req.user?.email

        // Find user IDs based on the provided emails
        const user:mongoose.Types.ObjectId | null = await User.findOne({ email: email }).select('_id').lean()
        if (!user) {
            return res.status(404).json({ message: 'No team found with the provided email.' });
        }
        const userId=user?._id.toString()
        const teams = await Team.find({emails: { $in: [userId.toString()] }});
        if(teams.length==0){
            return res.status(404).json({message:'No team found with the provided email'})
        }
        res.status(201).json(teams)
    } catch (error) {
        console.error('Error finding team:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

export const getTeamById = async (req: AuthenticatedRequest, res: Response) => {
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