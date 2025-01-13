import express from "express";
import { getAllItems, postItem } from "../controllers/itemsController";

const itemsRouter = express.Router();

itemsRouter.route("/").get(getAllItems).post(postItem);

export default itemsRouter;
