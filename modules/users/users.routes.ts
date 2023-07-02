import express from "express";
import register from "./controllers/register";
import login from "./controllers/login";
import forgetPassword from "./controllers/forget_passowrd";
import resetPassword from "./controllers/reset_password";
import auth from "../../middleware/auth";
import userDashBoards from "./controllers/userDashboard";

const userRoute = express.Router();

//routes..

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/forgetpassword", forgetPassword);
userRoute.post("/resetpassword", resetPassword);

userRoute.use(auth); //this acts as a middle ware for validation

//every thing below this auth route are the proteted routes.fully validated

userRoute.get("/dashboard", userDashBoards);

export default userRoute;
