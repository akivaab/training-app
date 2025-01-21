import express from "express";
import {
  getAllItems,
  postItem,
  getItem,
  patchItem,
  deleteItem,
  patchItemBorrower,
} from "../controllers/itemsController";
import {
  deleteItemComment,
  getAllItemComments,
  postItemComment,
} from "../controllers/commentsController";
import verifyPermission from "../middleware/verifyPermission";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(postItem);
itemsRouter
  .route("/:id")
  .get(getItem)
  .patch(verifyPermission, patchItem)
  .delete(/*allow only if posted by oneself*/ deleteItem);
itemsRouter.route("/:id/borrow").patch(patchItemBorrower);
itemsRouter
  .route("/:itemId/comments")
  .get(getAllItemComments)
  .post(postItemComment);
itemsRouter
  .route("/:itemId/comments/:commentId")
  .delete(/*allow only if written by oneself*/ deleteItemComment);

export default itemsRouter;
