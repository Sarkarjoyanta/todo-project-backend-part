import UsersModel from "../Models/UsersModel.js";
import {TokenEncoded} from "../Utility/TokenUtility.js";
import SendMail from "../Utility/EmailUtility.js";

// Registration

export const Registration = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await UsersModel.create(reqBody);
        if(data == null){
            return res.json({status: "Failed", Message:"Registration failed"});
        }else{
            return res.json({status: "success", Message:"Registration successful"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message: e.toString()})
    }
}

// Login

export const Login = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await UsersModel.findOne(reqBody);
        if(data == null){
            return res.json({status: "Failed", Message:"Login failed"});
        }else {
            let token = await TokenEncoded(data['email'], data['_id']);
            return res.json({status: "success", Message:"Login successful", token: token});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}

// ProfileDetails

export const ProfileDetails = async (req, res) => {
    try{
        let user_id = req.headers['user_id']
        let data = await UsersModel.findOne({"_id": user_id});
        if(data == null){
            return res.json({status: "Failed", Message:"User don't Exist"});
        }else{
            return res.json({status: "success", Message:"Profile Details successful"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:"Profile details failed"});
    }
}

// ProfileUpdate

export const ProfileUpdate = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        let data = await UsersModel.updateOne({"_id": user_id}, reqBody);
        if(data == null){
            return res.json({status: "Failed", Message:"User don't Exist"});
        }else{
            return res.json({status: "success", Message:"Profile Update successful"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}

// EmailVerify

export const EmailVerify = async (req, res) => {
    try{
        let email = req.params.email;
        let data = await UsersModel.findOne({email: email});
        if(data == null){
            return res.json({status: "Failed", Message:"User don't Exist"});
        }else{
            // send otp to email
            let code = Math.floor(100000+Math.random()*900000);
            let EmailTo = data['email'];
            let EmailText = "You Otp Code is" + code;
            let EmailSub = "Verify Your Email"
            await SendMail(EmailTo, EmailText, EmailSub);

            // update otp in user
            await UsersModel.updateOne({email: email}, {otp: code})

            return res.json({status: "success", Message:"Email Verified"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}


// CodeVerify

export const CodeVerify = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await UsersModel.findOne({email: reqBody['email'], otp: reqBody['otp']})
        if(data == null){
            return res.json({status: "Failed", Message:"Verification failed"});
        }else{
            return res.json({status: "success", Message:"Code Verified"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}

// PasswordReset

export const PasswordReset = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await UsersModel.findOne({email: reqBody['email'], otp: reqBody['otp']})
        if(data == null){
            return res.json({status: "Failed", Message:"Verification failed"});
        }else{
            await UsersModel.updateOne({email: reqBody['email']}, { otp: "0", password: reqBody['password']})
            return res.json({status: "success", Message:"PasswordReset Successful"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}