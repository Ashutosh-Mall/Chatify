import http from "http";
import {Server} from "socket.io";
import express from "express";
import {socketAuth} from "../middleware/isAuthSocket.js";
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const userSocketMap = {};

io.use(socketAuth);

export const getSocketId = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  const userId = socket.userId;

  console.log(`User connected: ${userId}`);
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {io, app, server};
