import * as jwt from 'jsonwebtoken'
import User, { IUser } from "../user/userModel";
import { Request, Response, NextFunction } from 'express';


export const verifyTokenForActivation = async (token: string, secret: string) => {

    try {
        const decoded = jwt.verify(token, secret)
        if(typeof decoded=="string"){
            return 'invalid token'
        }
        const email = decoded.email;
        const user = await User.findOne({email});
        if (user) {
            console.log(user)

            user.isActive = true;
            await user.save();
            return 'success'

        } else {
            return 'invalid link';
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return 'expired link';
        }

        return 'invalid link';
    }
}

export const verifyTokenForLogin = async (req:Request, res:Response, next:NextFunction) => {
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).send('No token secret available')
    } 
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET || "")
        if(typeof decoded=='string'){
            return res.status(401).send('Please Login Again')
        }
        const email = decoded.email;
        const user = await User.findOne({email});
        if (user) {
            console.log(user)

            user.isActive = true;
            await user.save();
            next()

        } else {
            return res.status(401).send('Please login again')
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send('Try logging again')
        }

        return res.status(404).send('Please Login')
    }
}