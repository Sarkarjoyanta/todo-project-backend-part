import TasksModel from "../Models/TasksModel.js";
import mongoose from "mongoose";

// CreateTask

export const CreateTask = async (req, res) => {
    try{
        let user_id = req.headers['user_id']
        let reqBody = req.body;
        reqBody.user_id = user_id;
        let data = await TasksModel.create(reqBody)
        if(data == null){
            return res.json({status: "Failed", Message:"Task Create Failed"});
        }else {
            return res.json({status: "success", Message:"Task Created Successful"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message: e.toString()});
    }
}

// UpdateTaskStatus

export const UpdateTaskStatus = async (req, res) => {
    try {
        let user_id = req.headers['user_id']
        let id = req.params.id;
        let status = req.params.status;
        let data = await TasksModel.updateOne({"_id":id, "user_id": user_id}, {status: status});
        if(data == null){
            return res.json({status: "Failed", Message:"TaskStatus Update Failed"});
        }else{
            return res.json({status: "success", Message:"TaskStatus Updated Successfully"});
        }

    }catch (e) {
        return res.json({status: "Failed", Message: e.toString()});
    }
}

// TaskStatusByList

export const TaskStatusByList = async (req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let status = req.params.status;
        let data = await TasksModel.findOne({user_id: user_id, status: status})
        if(data == null){
            return res.json({status: "Failed", Message:"TaskStatusByList Failed"});
        }else{
            return res.json({status: "success", Message:"TaskStatusByList Successfully"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}

// DeleteTask

export const DeleteTask = async (req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let id = req.params.id;
        let data = await TasksModel.deleteOne({"_id": id, "user_id": user_id});
        if(data == null){
            return res.json({status: "Failed", Message:"TaskDelete Failed"});
        }else{
            return res.json({status: "success", Message:"TaskDeleted Successfully"});
        }
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}

// CountsTask

export const CountsTask = async (req, res) => {
    try {
        let ObjectID = mongoose.Types.ObjectId;
        let user_id = new ObjectID(req.headers['user_id']);
        let data = await TasksModel.aggregate([
            {$match:{user_id: user_id}},
            {$group:{_id:"$status", sum:{$count:{}}}}
        ])
        return res.json({status: "success", Message:"Counts Task Successfully", data:data});
    }catch (e) {
        return res.json({status: "Failed", Message:e.toString()});
    }
}