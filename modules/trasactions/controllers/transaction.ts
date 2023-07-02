import mongoose from "mongoose";

const allTrasactions = async (req: any, res: any) => {
  const trascationModel = mongoose.model("transaction");

  const trasactions = await trascationModel.find({
    user_id: req.user._id,
    ...req.query, //this query the data and give the data according to this query
  });

  res.status(200).json({
    status: "sucess",
    data: trasactions,
  });
};
export default allTrasactions;
