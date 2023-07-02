"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const addExpense_1 = __importDefault(require("./controllers/addExpense"));
const addincome_1 = __importDefault(require("./controllers/addincome"));
const deleteTransaction_1 = __importDefault(require("./controllers/deleteTransaction"));
const editTransaction_1 = __importDefault(require("./controllers/editTransaction"));
const transaction_1 = __importDefault(require("./controllers/transaction"));
const transactionRoutes = express_1.default.Router();
//routes
transactionRoutes.use(auth_1.default);
//protected routes
transactionRoutes.post("/addIncome", addincome_1.default);
transactionRoutes.post("/addExpense", addExpense_1.default);
transactionRoutes.get("/", transaction_1.default);
transactionRoutes.delete("/:transaction_id", deleteTransaction_1.default);
transactionRoutes.patch("/", editTransaction_1.default);
exports.default = transactionRoutes;
