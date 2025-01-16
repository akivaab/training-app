import express from "express";
import { loginUser, registerUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(registerUser);

export default authRouter;
