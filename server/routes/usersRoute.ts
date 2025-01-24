import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  patchUser,
  patchUserRole,
} from "../controllers/usersController";
import verifyAdmin from "../middleware/verifyAdmin";

const usersRouter = express.Router();

usersRouter.route("/").get(verifyAdmin, getAllUsers);
usersRouter
  .route("/:id")
  .get(getUser)
  .patch(patchUser)
  .delete(verifyAdmin, deleteUser);
usersRouter.route("/:id/admin").patch(verifyAdmin, patchUserRole);

export default usersRouter;
