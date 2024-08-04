import * as jwt from 'jsonwebtoken'
import User, { IUser } from "../user/userModel";


export const verifyToken = async (token: string, secret: string) => {

    try {
        const decoded = jwt.verify(token, secret) as { email: string };
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