"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const user_model_1 = __importDefault(require("../../../models/user_model"));
const deleteTransaction = async (req, res) => {
    const transactionsModel = mongoose_1.default.model("transaction");
    const { transaction_id } = req.params;
    if (!validator_1.default.isMongoId(transaction_id.toString()))
        throw "Please provide a valid id";
    const getTransaction = await transactionsModel.findOne({
        _id: transaction_id,
    });
    if (!getTransaction)
        throw "Transaction not found!";
    if (getTransaction.transaction_type === "income") {
        await user_model_1.default.updateOne({
            _id: getTransaction.user_id,
        }, {
            $inc: {
                balance: getTransaction.amount * -1,
            },
        }, {
            runValidators: true,
        });
    }
    else {
        await user_model_1.default.updateOne({
            _id: getTransaction.user_id,
        }, {
            $inc: {
                balance: getTransaction.amount,
            },
        }, {
            runValidators: true,
        });
    }
    await transactionsModel.deleteOne({
        _id: transaction_id,
    });
    res.status(200).json({
        status: "Deleted sucessfully!",
    });
};
exports.default = deleteTransaction;
