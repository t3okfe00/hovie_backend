import express from "express";
import { Request, Response } from "express";
import userRouter from "./routes/userRouter";
const app = express();
const port = 3000;

app.use("/", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("asdsad!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
