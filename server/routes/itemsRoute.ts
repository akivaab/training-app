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
import verifyAdmin from "../middleware/verifyAdmin";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(postItem);
itemsRouter
  .route("/:id")
  .get(getItem)
  .patch(verifyAdmin, patchItem)
  .delete(deleteItem);
itemsRouter.route("/:id/borrow").patch(patchItemBorrower);
itemsRouter
  .route("/:itemId/comments")
  .get(getAllItemComments)
  .post(postItemComment);
itemsRouter.route("/:itemId/comments/:commentId").delete(deleteItemComment);

export default itemsRouter;
