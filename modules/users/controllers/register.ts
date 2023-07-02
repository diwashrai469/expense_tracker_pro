import mongoose from "mongoose";
import bcrypt from "bcrypt"; //to encript password
import emailManager from "../../../managers/emailManager";
import jwtManager from "../../../managers/jwtManager";

const register = async (req: any, res: any) => {
  const userModel = mongoose.model("users");

  const { email, password, confirm_password, full_name, balance } = req.body;

  const getDuplicateEmail = await userModel.findOne({
    email: email,
  });

  //validation
  if (!email) throw "Email must be provided!";
  if (!password) throw "Passowrd must be provided!";
  if (password.length < 5) throw "Passowrd must be more then 5!";
  if (!full_name) throw "Name must be provided!";
  if (password !== confirm_password)
    throw "Password and confirmed password does not match";

  if (getDuplicateEmail) throw "This email already exits!";

  const hashedPassword = await bcrypt.hash(password, 12); // can use hash number between 10-12

  //register user
  const createdUser = await userModel.create({
    full_name: full_name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });
  const acessToken = jwtManager(createdUser);

  //for email

  await emailManager(
    createdUser.email,
    "Welcome to expense tracker pro.Have a good day",
    "welcome "
  );

  res.status(201).json({
    status: "User registered sucessfully!",
    acessToken: acessToken,
  });
};
export default register;
