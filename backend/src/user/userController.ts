import User, { IUser } from "./userModel";
import { Request, Response } from "express";
import sendEmail from "./sendEmail";
import { verifyTokenForActivation } from "../auth/verifyToken";

import { generateTokenForActivation, generateTokenForLogin } from "../auth/generateToken";
// src/types/RequestBody.ts
interface RegisterRequestBody {
    email: string;
    name: string;
    password: string;
}


export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as RegisterRequestBody
    const token = generateTokenForActivation(email, process.env.TOKEN_SECRET || "")
    try {
        const userRegistrationResponse = new User({ name, email, password, token })
        await userRegistrationResponse.save()
        const activationLink = `${process.env.FRONT_END_URL}/activate?token=${token}`
        await sendEmail(email, "Click the activation link", `<p>Click the link <a href=${activationLink}>Activation Link</a> to get yourself verified</p>`)
        res.send({ "token": token })
    } catch (error) {
        res.status(400).send(error)
    }
}


export const activateUser = async (req: Request, res: Response) => {
    const token = req.body.token as string;

    try {
        const verifyResponse = await verifyTokenForActivation(token, process.env.TOKEN_SECRET || "")
        if (verifyResponse == 'expired link') {
            res.status(400).send('Your link is expired')
        } else if(verifyResponse=="invalid link"){
            res.status(400).send('Invalid activation ink')
        }
        else {
            res.status(200).send('Your activation is done successfully')
        }
    } catch (error) { 
        res.status(404).send('Invalid activation ink')
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as RegisterRequestBody
    try {
        const user = await User.findOne({ email, password })
        if (user) {
            const token = generateTokenForLogin(email, process.env.TOKEN_SECRET || "")
            res.status(200).send(token)
        }
    }
    catch (error) {
        res.status(404).send(error)
    }
}