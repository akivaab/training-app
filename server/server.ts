import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import itemsRouter from "./routes/itemsRoute";
import usersRouter from "./routes/usersRoute";
import authRouter from "./routes/authRoute";
import verifyJWT from "./middleware/verifyJWT";
import errorHandler from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(verifyJWT);

app.use("/items", itemsRouter);
app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
