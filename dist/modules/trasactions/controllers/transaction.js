"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const allTrasactions = async (req, res) => {
    const trascationModel = mongoose_1.default.model("transaction");
    const trasactions = await trascationModel.find({
        user_id: req.user._id,
        ...req.query, //this query the data and give the data according to this query
    });
    res.status(200).json({
        status: "sucess",
        data: trasactions,
    });
};
exports.default = allTrasactions;
