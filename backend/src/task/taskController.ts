import { Request, Response } from 'express';
import Team from '../team/teamModel'; // Adjust path as necessary
import Task from './taskModel'
import mongoose from 'mongoose';




export const createTask = async (req: Request, res: Response) => {
    try {
        const { teamID, tasks } = req.body; // emails should be an array of user emails
        // Find user IDs based on the provided emails
        const team = await Team.findById(teamID).select('_id');

        if (!team) {
            return res.status(404).json({ message: 'No team found.' });
        }

        const newTasks = new Task({
            taskBelongsTo: teamID,
            taskNumber: tasks.taskNumber,
            description: tasks.description,
            status: tasks.status,
        });

        await newTasks.save();
        res.status(201).json(newTasks);
    } catch (error) {
        console.error('Error creating tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        // Find user IDs based on the provided emails
        const {teamID} = req.params
        const objectId = new mongoose.Types.ObjectId(teamID);

        const team: mongoose.Types.ObjectId | null = await Team.findById(objectId).select('_id').lean()
        if (!team) {
            return res.status(404).json({ message: 'No team found with the provided email.' });
        }
        const tasks = await Task.find({ taskBelongsTo: team });
        if (!tasks) {
            return res.status(404).json({ message: 'No team found with the provided email' })
        }
        res.status(201).json(tasks)
    } catch (error) {
        console.error('Error finding task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

