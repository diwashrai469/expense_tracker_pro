const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addincome");
const addExpense = require("./controllers/addExpense");
const allTrasactions = require("./controllers/transaction");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionRoutes = express.Router();
//routes

transactionRoutes.use(auth);

//protected routes

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", allTrasactions);
transactionRoutes.delete("/:transaction_id", deleteTransaction);
transactionRoutes.patch("/", editTransaction);
module.exports = transactionRoutes;
