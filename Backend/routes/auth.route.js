import express from "express";
import {
  register,
  login,
  logout,
  getUser
} from "../controllers/auth.controller.js";

import { isAuth } from "../middleware/isAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", isAuth, logout);

authRouter.get("/get/me", isAuth, getUser);

export default authRouter;