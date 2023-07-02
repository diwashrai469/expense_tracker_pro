"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Works like a global function to create a JWT access token and the information to be shown when the JWT token is decoded
const jwtManager = (user) => {
    const secretKey = process.env.jwt_salt;
    if (!secretKey) {
        throw new Error('No JWT salt provided!');
    }
    const accessToken = jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.full_name,
        balance: user.balance,
    }, secretKey);
    return accessToken;
};
exports.default = jwtManager;
