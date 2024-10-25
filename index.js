import express from 'express';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import {DATABASE_URL, JSON_MAX_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE} from "./App/Config/Config.js";
import routes from "./Routes/index.js";

const app = express();

// Default App Middleware
app.use(cors());
app.use(express.json({limit: JSON_MAX_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

// Request Limit
const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER});
app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// Router
app.use("/api", routes);

// Database connection
mongoose.connect(DATABASE_URL, {autoIndex: true}).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log("DB Disconnected",err);
})

// Port
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})