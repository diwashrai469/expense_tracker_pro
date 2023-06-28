const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashBoards = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgetPassword = require("./controllers/forget_passowrd");
const resetPassword = require("./controllers/reset_password");
const userRoute = express.Router();

//routes..

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/forgetpassword", forgetPassword);
userRoute.post("/resetpassword", resetPassword);

userRoute.use(auth); //this acts as a middle ware for validation

//every thing below this auth route are the proteted routes.fully validated

userRoute.get("/dashboard", userDashBoards);

module.exports = userRoute;
