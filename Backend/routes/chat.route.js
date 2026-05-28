import express from "express";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

import {isAuth} from "../middleware/isAuth.js";

const chatRouter = express.Router();

chatRouter.get("/users", isAuth, getAllUsers);

chatRouter.get("/messages/:receiverId", isAuth, getMessages);

chatRouter.post("/send/:receiverId", isAuth, sendMessage);

export default chatRouter;
