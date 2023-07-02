"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//schema
const trascationSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transaction_type: {
        type: String,
        required: true,
        enum: ["income", "expense"], //only contains either of these two value
    },
    remarks: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, //its show created and updated date automatically
});
const trascationModel = mongoose_1.default.model("transaction", trascationSchema);
exports.default = trascationModel; //it export the file so that it can be used in another file
