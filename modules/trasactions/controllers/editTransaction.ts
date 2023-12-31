import mongoose from "mongoose";
import validator from "validator";

const editTransaction = async (req:any, res:any) => {
  const transactionsModel = mongoose.model("transaction");

  const { transaction_id, remarks, amount, transaction_type } = req.body;
  if (!transaction_id) throw "Transaction id is required";

//   if (transaction_type !== "income" && transaction_type !== "expense")
//     throw "Transaction type must be a defined type!";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id";

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "Transaction not found!";

  await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "edited sucessfully!",
  });
};
export default editTransaction;
