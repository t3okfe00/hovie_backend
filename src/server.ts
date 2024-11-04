const express = require("express");
import { Request, Response, NextFunction } from "express";
const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("asdsad!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
