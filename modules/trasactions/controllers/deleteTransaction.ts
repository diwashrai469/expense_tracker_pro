import mongoose from "mongoose";
import validator from "validator";
import userModel from "../../../models/user_model";

const deleteTransaction = async (req:any, res:any) => {
  const transactionsModel = mongoose.model("transaction");

  const { transaction_id } = req.params;
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id";

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "Transaction not found!";

  if (getTransaction.transaction_type === "income") {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    await userModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionsModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Deleted sucessfully!",
  });
};
export default deleteTransaction;
