import express from 'express';
import { registerUser, activateUser,login } from './userController';

const userRouter = express.Router()

userRouter.post('/signup',registerUser)
userRouter.get('/activate',activateUser)
userRouter.post('/login', login)


export default userRouter
