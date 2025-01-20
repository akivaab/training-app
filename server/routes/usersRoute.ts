import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/usersController";
import verifyPermission from "../middleware/verifyPermission";

const usersRouter = express.Router();

usersRouter.route("/").get(verifyPermission, getAllUsers);
usersRouter
  .route("/:id")
  .get(/*allow only if is oneself*/ getUser)
  .delete(verifyPermission, deleteUser);

export default usersRouter;
