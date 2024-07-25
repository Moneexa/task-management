import User, { IUser } from "./userModel";
import { Request, Response } from "express";
import sendEmail from "./sendEmail";
import { userInfo } from "os";
// src/types/RequestBody.ts
interface RegisterRequestBody {
    email: string;
    name: string;
    password: string;
}


export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as RegisterRequestBody
    const token = crypto.randomUUID().toString();
    try {
        const userRegistrationResponse = new User({ name, email, password, token })
        await userRegistrationResponse.save()
        const activationLink = `${process.env.FRONT_END_URL}/activate?token=${token}`
        await sendEmail(email, "Click the activation link", `<p>Click the link <a href=${activationLink}>Activation Link</a> to get yourself verified</p>`)
        res.status(200).send("Please check your email for further verification")
    } catch (error) {
        res.status(400).send(error)
    }
}


export const activateUser = async (req: Request, res: Response) => {
    const queryToken = req.query
    try {
        const userFound = await User.findOne({ token: queryToken })
        if (!userFound) {
            res.status(404).send("No User Found or the activation link has been expired")
        } else {
            userFound.isActive = true;
            userFound.token = '';
            await userFound.save();

            res.status(200).send("Your user activated successfully")
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

export const login=async(req:Request, res:Response)=>{
    const {name, email, password}=req.body as RegisterRequestBody
    try{
        const user=await User.findOne({name, email, password})
        if(user){
            res.status(200)
        }
    }
    catch(error){
        res.status(404).send(error)
    }
}