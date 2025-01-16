import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/:id").get(getUser).delete(deleteUser);

export default usersRouter;
