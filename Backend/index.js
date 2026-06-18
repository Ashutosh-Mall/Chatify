import express from 'express';
import { app, server } from './socket/server.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chat.route.js';
dotenv.config()

app.use(express.json({
    limit: "5mb"
}));

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

const port = process.env.PORT || 5000;

server.listen(port, "0.0.0.0", () => {
    connectDB();
    console.log("Server running on port: " + port);
});
