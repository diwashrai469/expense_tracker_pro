"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./controllers/register"));
const login_1 = __importDefault(require("./controllers/login"));
const forget_passowrd_1 = __importDefault(require("./controllers/forget_passowrd"));
const reset_password_1 = __importDefault(require("./controllers/reset_password"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const userDashboard_1 = __importDefault(require("./controllers/userDashboard"));
const userRoute = express_1.default.Router();
//routes..
userRoute.post("/register", register_1.default);
userRoute.post("/login", login_1.default);
userRoute.post("/forgetpassword", forget_passowrd_1.default);
userRoute.post("/resetpassword", reset_password_1.default);
userRoute.use(auth_1.default); //this acts as a middle ware for validation
//every thing below this auth route are the proteted routes.fully validated
userRoute.get("/dashboard", userDashboard_1.default);
exports.default = userRoute;
