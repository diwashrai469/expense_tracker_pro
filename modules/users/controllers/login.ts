import mongoose from "mongoose";
import bcrypt from "bcrypt"; //to encript password
import jwtManager from "../../../managers/jwtManager";


const login = async (req:any, res:any) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exits!";
  const comparePassword = await bcrypt.compare(password, getUser.password); //give true and false as a bool value

  if (!comparePassword) throw "Email and password does not match!";

  const acessToken = jwtManager(getUser);

  //sucess respnse
  res.status(201).json({
    status: "sucess",
    message: "User logged in successfully!",
    acessToken: acessToken,
  });
};

export default login;
