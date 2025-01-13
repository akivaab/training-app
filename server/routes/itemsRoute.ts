import express from "express";
import {
  getAllItems,
  postItem,
  getItem,
  patchItem,
  deleteItem,
} from "../controllers/itemsController";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(postItem);
itemsRouter.route("/:id").get(getItem).patch(patchItem).delete(deleteItem);

export default itemsRouter;
