import express from 'express';
const router = express.Router();

import * as UsersController from '../App/controllers/UsersController.js';
import * as TasksController from '../App/controllers/TasksController.js';
import AuthMiddleWare from "../App/MiddleWare/AuthMiddleWare.js";

// Users
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.get("/ProfileDetails",AuthMiddleWare, UsersController.ProfileDetails);
router.post("/ProfileUpdate/:id",AuthMiddleWare, UsersController.ProfileUpdate);
router.get("/EmailVerify/:email", UsersController.EmailVerify);
router.post("/CodeVerify", UsersController.CodeVerify);
router.post("/PasswordReset", UsersController.PasswordReset);

// Tasks
router.post("/CreateTask", AuthMiddleWare, TasksController.CreateTask);
router.get("/UpdateTaskStatus/:id/:status", AuthMiddleWare, TasksController.UpdateTaskStatus);
router.get("/TaskStatusByList/:status", AuthMiddleWare, TasksController.TaskStatusByList);
router.get("/DeleteTask/:id", AuthMiddleWare, TasksController.DeleteTask);
router.get("/CountsTask", AuthMiddleWare, TasksController.CountsTask);


export default router;

