import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import  userRouter from './src/user/userRoutes';
import teamRouter from './src/team/teamRouter'
import mongoose from 'mongoose';

dotenv.config()
const app = express();


app.use(express.json());
app.use(cors())
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

connectDB()  
app.use('/api',userRouter)
app.use('/api', teamRouter)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("backend connected", PORT)
});
