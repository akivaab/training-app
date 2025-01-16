import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import itemsRouter from "./routes/itemsRoute";
import usersRouter from "./routes/usersRoute";
import authRouter from "./routes/authRoute";
import { verifyJWT } from "./middleware/verifyJWT";

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use(verifyJWT);

app.use("/items", itemsRouter);
app.use("/users", usersRouter);

// Define the root path with a greeting message
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Welcome to the Express + TypeScript Server!" });
// });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
