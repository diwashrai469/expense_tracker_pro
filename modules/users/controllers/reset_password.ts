import mongoose from "mongoose";
import bcrypt from "bcrypt"; //to encript password
import emailManager from "../../../managers/emailManager";


const resetPassword = async (req:any, res:any) => {
  const userModel = mongoose.model("users");
  const { email, new_password, reset_code } = req.body;

  //validation
  if (!email) throw "Email must be provided!";
  if (!new_password) throw "Passowrd must be provided!";
  if (!reset_code) throw "reset code must be provided!";
  if (new_password.length < 5) throw "Passowrd must be more then 5!";

  const getUserWithResetCode = await userModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code does not match!";
  const hashedPassword = await bcrypt.hash(new_password, 12); // can use hash number between 10-12
  await userModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(email,"your password is reset sucessfully!", "hello")

  res.status(200).json({
    status: "sucess",
    message: "Password is updated sucessfully!",
  });
};
export default resetPassword;
