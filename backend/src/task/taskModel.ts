import mongoose, { Document, Schema } from 'mongoose';
import  {ITeam} from '../team/teamModel'; // Adjust the import according to your file structure

export interface ITask extends Document {
    taskNumber: string;
    taskBelongsTo: ITeam['_id'];
    description:string;
    status: string;

}

const TaskSchema: Schema = new Schema({
    taskBelongsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }, // Reference to User model
    taskNumber: { type: String, required: false },
    description:{type:String, required:false},
    status: { type: String, required: false },
});

export default mongoose.model<ITask>('Task', TaskSchema);
