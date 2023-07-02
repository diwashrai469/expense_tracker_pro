const mongoose = require("mongoose");

//schema

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Please provide full name"],
    },
    email: {
      type: String,
      required: [true, "Please provde email"],
      unique: true, //show error if have same email is entered
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      default: 0,
    },

    reset_code: {
      type: Number,
    },
  },
  {
    timestamps: true, //its show created and updated date automatically
  }
);

const userModel = mongoose.model("users", userSchema);
export default userModel; //it export the file so that it can be used in another file
