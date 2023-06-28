const mongoose = require("mongoose");

//schema

const trascationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ["income", "expense"], //only contains either of these two value
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //its show created and updated date automatically
  }
);

const trascationModel = mongoose.model("transaction", trascationSchema);
module.exports = trascationModel; //it export the file so that it can be used in another file
