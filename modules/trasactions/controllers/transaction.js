const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/user_model");

const allTrasactions = async (req, res) => {
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
module.exports = allTrasactions;
