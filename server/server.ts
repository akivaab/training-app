import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import itemsRouter from "./routes/itemsRoute";
import usersRouter from "./routes/usersRoute";
import authRouter from "./routes/authRoute";
import { verifyJWT } from "./middleware/verifyJWT";

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 5000;

//note: fine-tune cors, figure out secure and sameSite for refresh token cookies
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

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
