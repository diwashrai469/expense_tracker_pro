"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const editTransaction = async (req, res) => {
    const transactionsModel = mongoose_1.default.model("transaction");
    const { transaction_id, remarks, amount, transaction_type } = req.body;
    if (!transaction_id)
        throw "Transaction id is required";
    //   if (transaction_type !== "income" && transaction_type !== "expense")
    //     throw "Transaction type must be a defined type!";
    if (!validator_1.default.isMongoId(transaction_id.toString()))
        throw "Please provide a valid id";
    const getTransaction = await transactionsModel.findOne({
        _id: transaction_id,
    });
    if (!getTransaction)
        throw "Transaction not found!";
    await transactionsModel.updateOne({
        _id: transaction_id,
    }, {
        remarks,
    }, {
        runValidators: true,
    });
    res.status(200).json({
        status: "edited sucessfully!",
    });
};
exports.default = editTransaction;
