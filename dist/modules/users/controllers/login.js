"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt")); //to encript password
const jwtManager_1 = __importDefault(require("../../../managers/jwtManager"));
const login = async (req, res) => {
    const userModel = mongoose_1.default.model("users");
    const { email, password } = req.body;
    const getUser = await userModel.findOne({
        email: email,
    });
    if (!getUser)
        throw "This email does not exits!";
    const comparePassword = await bcrypt_1.default.compare(password, getUser.password); //give true and false as a bool value
    if (!comparePassword)
        throw "Email and password does not match!";
    const acessToken = (0, jwtManager_1.default)(getUser);
    //sucess respnse
    res.status(201).json({
        status: "sucess",
        message: "User logged in successfully!",
        acessToken: acessToken,
    });
};
exports.default = login;
