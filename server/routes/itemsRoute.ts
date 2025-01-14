import express from "express";
import {
  getAllItems,
  postItem,
  getItem,
  patchItem,
  deleteItem,
} from "../controllers/itemsController";
import {
  deleteItemComment,
  getAllItemComments,
  postItemComment,
} from "../controllers/commentsController";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(postItem);
itemsRouter.route("/:id").get(getItem).patch(patchItem).delete(deleteItem);
itemsRouter
  .route("/:itemId/comments")
  .get(getAllItemComments)
  .post(postItemComment);
itemsRouter.route("/:itemId/comments/:commentId").delete(deleteItemComment);

export default itemsRouter;
