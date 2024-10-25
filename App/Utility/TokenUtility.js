import {JWT_EXPIRE_TIME, JWT_SECRET} from "../Config/Config.js";
import jwt from "jsonwebtoken";

export const TokenEncoded = (email, user_id)=>{
    let PAYLOAD = {email: email, user_id: user_id};
    let SECURE = JWT_SECRET;
    let EXPIRE = {expiresIn: JWT_EXPIRE_TIME};
    return jwt.sign(PAYLOAD, SECURE, EXPIRE);
}

export const TokenDecoded = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(e){
        return null;
    }
}