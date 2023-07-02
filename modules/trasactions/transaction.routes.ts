import express from "express";

import auth from "../../middleware/auth";
import addExpense from "./controllers/addExpense";
import addIncome from "./controllers/addincome";
import deleteTransaction from "./controllers/deleteTransaction";
import editTransaction from "./controllers/editTransaction";
import allTrasactions from "./controllers/transaction";

const transactionRoutes = express.Router();
//routes

transactionRoutes.use(auth);

//protected routes

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", allTrasactions);
transactionRoutes.delete("/:transaction_id", deleteTransaction);
transactionRoutes.patch("/", editTransaction);

export default transactionRoutes;
