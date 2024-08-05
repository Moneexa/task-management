import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../user/userModel'; // Adjust the import according to your file structure

export interface ITeam extends Document {
    name: string;
    emails: IUser['_id'][]; // Use ObjectId array to reference multiple users
}

const TeamSchema: Schema = new Schema({
    emails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Reference to User model
    name: { type: String, required: true }
});

export default mongoose.model<ITeam>('Team', TeamSchema);
