"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userDashBoards = async (req, res) => {
    const userModel = mongoose_1.default.model("users");
    const trascationModel = mongoose_1.default.model("transaction");
    const getUser = await userModel
        .findOne({
        _id: req.user._id,
    })
        .select("-password"); //for excluding the password field in the response
    const transaction = await trascationModel
        .find({
        user_id: req.user._id,
    })
        .sort("-createdAt")
        .limit(5); //only show 5 data
    //sucess respnse
    res.status(200).json({
        status: "sucess",
        data: getUser,
        transaction: transaction,
    });
};
exports.default = userDashBoards;
