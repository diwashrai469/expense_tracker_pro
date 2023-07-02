"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt")); //to encript password
const emailManager_1 = __importDefault(require("../../../managers/emailManager"));
const jwtManager_1 = __importDefault(require("../../../managers/jwtManager"));
const register = async (req, res) => {
    const userModel = mongoose_1.default.model("users");
    const { email, password, confirm_password, full_name, balance } = req.body;
    const getDuplicateEmail = await userModel.findOne({
        email: email,
    });
    //validation
    if (!email)
        throw "Email must be provided!";
    if (!password)
        throw "Passowrd must be provided!";
    if (password.length < 5)
        throw "Passowrd must be more then 5!";
    if (!full_name)
        throw "Name must be provided!";
    if (password !== confirm_password)
        throw "Password and confirmed password does not match";
    if (getDuplicateEmail)
        throw "This email already exits!";
    const hashedPassword = await bcrypt_1.default.hash(password, 12); // can use hash number between 10-12
    //register user
    const createdUser = await userModel.create({
        full_name: full_name,
        email: email,
        password: hashedPassword,
        balance: balance,
    });
    const acessToken = (0, jwtManager_1.default)(createdUser);
    //for email
    await (0, emailManager_1.default)(createdUser.email, "Welcome to expense tracker pro.Have a good day", "welcome ");
    res.status(201).json({
        status: "User registered sucessfully!",
        acessToken: acessToken,
    });
};
exports.default = register;
