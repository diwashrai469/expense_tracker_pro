require("express-async-errors");

import express from "express";
import cors from "cors"; //fro deployment

import mongoose from "mongoose";
import transactionRoutes from "./modules/trasactions/transaction.routes";
import errorHandler from "./handler/errorHandler";
import userRoute from "./modules/users/users.routes";

const app = express();
app.use(cors());

require("dotenv").config();
app.use(express.json());

if (!process.env.mongo_connection)
  throw Error("No MongoDB connection string provided!");

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Connection to mongodb sucessful!");
  })
  .catch(() => {
    console.log("Connection to mongodb failed!");
  });
//routes
app.use("/api/users", userRoute);
app.use("/api/transactionRoute", transactionRoutes);

//models initialization
require("./models/user_model");
require("./models/transaction_model");

//end of all routes
app.all("*", (req: any, res: any, next: any) => {
  //if type wrong url then this will triggred.
  res.status(404).json({
    status: "failed",
    message: "Not found!",
  });
});
app.use(errorHandler);
app.listen(8000, () => {
  console.log("Server started sucessfully");
});
