"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt")); //to encript password
const emailManager_1 = __importDefault(require("../../../managers/emailManager"));
const resetPassword = async (req, res) => {
    const userModel = mongoose_1.default.model("users");
    const { email, new_password, reset_code } = req.body;
    //validation
    if (!email)
        throw "Email must be provided!";
    if (!new_password)
        throw "Passowrd must be provided!";
    if (!reset_code)
        throw "reset code must be provided!";
    if (new_password.length < 5)
        throw "Passowrd must be more then 5!";
    const getUserWithResetCode = await userModel.findOne({
        email: email,
        reset_code: reset_code,
    });
    if (!getUserWithResetCode)
        throw "Reset code does not match!";
    const hashedPassword = await bcrypt_1.default.hash(new_password, 12); // can use hash number between 10-12
    await userModel.updateOne({
        email: email,
    }, {
        password: hashedPassword,
        reset_code: "",
    }, {
        runValidators: true,
    });
    await (0, emailManager_1.default)(email, "your password is reset sucessfully!", "hello");
    res.status(200).json({
        status: "sucess",
        message: "Password is updated sucessfully!",
    });
};
exports.default = resetPassword;
