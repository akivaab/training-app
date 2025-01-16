import express from "express";
import {
  authLogin,
  authRefresh,
  authRegister,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/login").post(authLogin);
authRouter.route("/register").post(authRegister);
authRouter.route("/refresh").get(authRefresh);

export default authRouter;
