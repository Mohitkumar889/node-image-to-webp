const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
