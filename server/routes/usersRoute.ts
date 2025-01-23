import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  patchUserRole,
} from "../controllers/usersController";
import verifyAdmin from "../middleware/verifyAdmin";

const usersRouter = express.Router();

usersRouter.route("/").get(verifyAdmin, getAllUsers);
usersRouter
  .route("/:id")
  .get(getUser)
  .patch(patchUserRole)
  .delete(verifyAdmin, deleteUser);

export default usersRouter;
