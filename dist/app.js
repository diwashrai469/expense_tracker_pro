"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); //fro deployment
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_routes_1 = __importDefault(require("./modules/trasactions/transaction.routes"));
const errorHandler_1 = __importDefault(require("./handler/errorHandler"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
require("dotenv").config();
app.use(express_1.default.json());
if (!process.env.mongo_connection)
    throw Error("No MongoDB connection string provided!");
mongoose_1.default
    .connect(process.env.mongo_connection, {})
    .then(() => {
    console.log("Connection to mongodb sucessful!");
})
    .catch(() => {
    console.log("Connection to mongodb failed!");
});
//routes
app.use("/api/users", users_routes_1.default);
app.use("/api/transactionRoute", transaction_routes_1.default);
//models initialization
require("./models/user_model");
require("./models/transaction_model");
//end of all routes
app.all("*", (req, res, next) => {
    //if type wrong url then this will triggred.
    res.status(404).json({
        status: "failed",
        message: "Not found!",
    });
});
app.use(errorHandler_1.default);
app.listen(8000, () => {
    console.log("Server started sucessfully");
});
