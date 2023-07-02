import mongoose from "mongoose";

const userDashBoards = async (req:any, res:any) => {
  const userModel = mongoose.model("users");
  const trascationModel = mongoose.model("transaction");

  const getUser = await userModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password"); //for excluding the password field in the response
  const transaction = await trascationModel
    .find({
      user_id: req.user._id,
    })
    .sort("-createdAt")
    .limit(5); //only show 5 data

  //sucess respnse
  res.status(200).json({
    status: "sucess",
    data: getUser,
    transaction: transaction,
  });
};
export default userDashBoards;
