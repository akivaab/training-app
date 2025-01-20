import express from "express";
import {
  authLogin,
  authLogout,
  authRefresh,
  authRegister,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/login").post(authLogin);
authRouter.route("/register").post(authRegister);
authRouter.route("/refresh").get(authRefresh);
authRouter.route("/logout").get(authLogout);

export default authRouter;
