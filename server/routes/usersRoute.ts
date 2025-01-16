import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  postUser,
} from "../controllers/usersController";
import { verifyJWT } from "../middleware/verifyJWT";

const usersRouter = express.Router();

usersRouter.route("/").get(verifyJWT, getAllUsers).post(postUser);
usersRouter.route("/:id").get(getUser).delete(deleteUser);
usersRouter.route("/login").post(loginUser);

export default usersRouter;
