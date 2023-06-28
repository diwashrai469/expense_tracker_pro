require("express-async-errors");

const express = require("express");
const cors = require("cors"); //fro deployment
const errorHandler = require("./handler/errorHandler");
const mongoose = require("mongoose");
const userRoute = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/trasactions/transaction.routes");

const app = express();
app.use(cors());

require("dotenv").config();
app.use(express.json());

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
app.all("*", (req, res, next) => {
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
