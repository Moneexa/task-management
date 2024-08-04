import * as jwt from "jsonwebtoken";

export const generateTokenForActivation=(email:string, token_secret:string)=>{
    return jwt.sign({email}, token_secret,{
        expiresIn:'120s'
    })
}

export const generateTokenForLogin=(email:string, token_secret:string)=>{
    return jwt.sign({email}, token_secret,{
        expiresIn:'1800s'
    })

}