"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailManager_1 = __importDefault(require("../../../managers/emailManager"));
const forgetPassword = async (req, res) => {
    const userModel = mongoose_1.default.model("users");
    const { email } = req.body;
    if (!email)
        throw "Email is required!";
    const getUser = await userModel.findOne({
        email: email,
    });
    if (!getUser)
        throw "This email does not exist in the system!";
    //generate a random reset code
    const resetCode = Math.floor(10000 + Math.random() * 90000);
    await userModel.updateOne({
        email: email,
    }, {
        reset_code: resetCode,
    }, {
        runValidators: true,
    });
    //email
    await (0, emailManager_1.default)(email, "your password reset code is " + resetCode, "Reset your password");
    res.status(200).json({
        status: "Reset code sent to email sucessfully!",
    });
};
exports.default = forgetPassword;
