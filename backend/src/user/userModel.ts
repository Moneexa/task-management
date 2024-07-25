import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  token: string;
  isActive: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  isActive: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);
