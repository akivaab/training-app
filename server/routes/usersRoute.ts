import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  postUser,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers).post(postUser);
usersRouter.route("/:id").get(getUser).delete(deleteUser);

export default usersRouter;
