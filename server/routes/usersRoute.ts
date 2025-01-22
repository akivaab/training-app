import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  patchUserRole,
} from "../controllers/usersController";
import verifyPermission from "../middleware/verifyPermission";

const usersRouter = express.Router();

usersRouter.route("/").get(verifyPermission, getAllUsers);
usersRouter
  .route("/:id")
  .get(/*allow only if is oneself*/ getUser)
  .patch(patchUserRole)
  .delete(verifyPermission, deleteUser);

export default usersRouter;
