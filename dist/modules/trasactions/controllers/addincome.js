"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const user_model_1 = __importDefault(require("../../../models/user_model"));
const addIncome = async (req, res) => {
    const transactionsModel = mongoose_1.default.model("transaction");
    const { amount, remarks } = req.body;
    if (!amount)
        throw "Amount is required!";
    if (!remarks)
        throw "Remarks is required!";
    if (remarks.length < 5)
        throw "Remarks must be at least 5 characters long!";
    if (!validator_1.default.isNumeric(amount.toString()))
        throw "Amount must be a valid number.";
    if (amount < 0)
        throw "Amount cannot be negative";
    await transactionsModel.create({
        user_id: req.user._id,
        amount: amount,
        remarks: remarks,
        transaction_type: "income",
    });
    await user_model_1.default.updateOne({
        _id: req.user._id,
    }, {
        $inc: {
            balance: amount,
        },
    }, {
        runValidators: true,
    });
    res.status(200).json({
        status: "sucess",
        message: "Income added sucessfully!",
    });
};
exports.default = addIncome;
